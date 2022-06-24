import { getState } from '@src/common'
import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT } from '@src/constants'
import { FirebasePagination, Post, PostPayload, Reaction, User } from '@src/models'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore'

export const postService = {
  createNew: async (creator: User, post: Partial<PostPayload>) => {
    const editedPost: Partial<PostPayload> = {
      ...post,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      creator: doc(firestore, `${FIRESTORE_ENDPOINT.USERS}/${creator.id}`),
      authorId: creator.id
    }
    try {
      const result = await addDoc(collection(firestore, FIRESTORE_ENDPOINT.POSTS), editedPost)
      return result
    } catch (error) {
      console.log(error)
    }
  },
  updatePost: async (post: Partial<PostPayload>) => {
    const editedPost: Partial<PostPayload> = {
      ...post,
      updatedAt: new Date().getTime()
    }
    try {
      const result = await updateDoc(doc(firestore, FIRESTORE_ENDPOINT.POSTS, post.id!), editedPost)
      return result
    } catch (error) {
      console.log(error)
    }
  },
  deletePost: async (postId: string) => {
    try {
      const result = await deleteDoc(doc(firestore, FIRESTORE_ENDPOINT.POSTS, postId))
      return result
    } catch (error) {
      console.log(error)
    }
  },

  getSinglePostById: async (id: string) => {
    try {
      const docRef = doc(firestore, FIRESTORE_ENDPOINT.POSTS, id)
      const docSnapshot = await getDoc(docRef)

      const commentsRef = collection(
        firestore,
        FIRESTORE_ENDPOINT.POSTS,
        docSnapshot.id,
        FIRESTORE_ENDPOINT.COMMENTS
      )
      const creatorDocRef = docSnapshot.data()?.creator
      const reactsRef = collection(
        firestore,
        FIRESTORE_ENDPOINT.POSTS,
        docSnapshot.id,
        FIRESTORE_ENDPOINT.REACTIONS
      )
      const commentDocs = await getDocs(query(commentsRef))
      const creator = await getDoc(creatorDocRef)
      const reactDocs = await getDocs(query(reactsRef))

      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
        comments: commentDocs.size,
        creator: creator.data(),
        reacts: reactDocs.docs.map(_ => _.data())
      } as unknown as Post
    } catch (error) {
      return
    }
  },

  likePost: async (postId: string, _isLiked: boolean) => {
    const { user } = getState('user')
    if (!user) return

    const reactionCollectionRef = collection(
      firestore,
      FIRESTORE_ENDPOINT.POSTS,
      postId,
      FIRESTORE_ENDPOINT.REACTIONS
    )

    const queryRef = query(reactionCollectionRef, where('userId', '==', user.id))
    const reactionSnapshot = await getDocs(queryRef)

    if (_isLiked) {
      if (reactionSnapshot.size === 0) {
        const reaction: Reaction = { userId: user?.id, type: 'like' }
        await addDoc(reactionCollectionRef, reaction)
      }
    } else {
      if (reactionSnapshot.size > 0) {
        await deleteDoc(reactionSnapshot.docs[0].ref)
      }
    }
  },

  getList: async (
    pagination: FirebasePagination,
    { onNext }: { onNext?: (result: any) => void }
  ) => {
    const { user } = getState('user')
    if (!user) return

    try {
      const postsRef = collection(firestore, FIRESTORE_ENDPOINT.POSTS)

      const queryRef = pagination.startAfter
        ? query(
            postsRef,
            where('authorId', 'in', (user.followingIDs || []).concat([user.id])),
            orderBy('createdAt', 'desc'),
            limit(pagination?.limit || 10),
            startAfter(pagination.startAfter)
          )
        : query(
            postsRef,
            where('authorId', 'in', (user.followingIDs || []).concat([user.id])),
            orderBy('createdAt', 'desc'),
            limit(pagination?.limit || 10)
          )
      // const querySnapShot = await getDocs(queryRef)
      return onSnapshot(queryRef, async querySnapShot => {
        const promises = querySnapShot.docs.map(async _doc => {
          const creatorDocRef = _doc.data().creator
          const commentsRef = collection(
            firestore,
            FIRESTORE_ENDPOINT.POSTS,
            _doc.id,
            FIRESTORE_ENDPOINT.COMMENTS
          )
          const reactsRef = collection(
            firestore,
            FIRESTORE_ENDPOINT.POSTS,
            _doc.id,
            FIRESTORE_ENDPOINT.REACTIONS
          )

          const creator = await getDoc(creatorDocRef)
          const commentDocs = await getDocs(query(commentsRef))
          const reactDocs = await getDocs(query(reactsRef))

          return {
            id: _doc.id,
            ..._doc.data(),
            comments: commentDocs.size,
            creator: creator.data(),
            reacts: reactDocs.docs.map(_ => _.data()),
            createdAt:
              typeof _doc.data().createdAt === 'number'
                ? _doc.data().createdAt
                : _doc.data().createdAt.toDate().getTime()
          } as Post
        })

        const result = await Promise.all(promises)
        if (onNext)
          onNext({
            posts: result,
            isLast: querySnapShot.empty,
            lastDoc: querySnapShot.docs[querySnapShot.docs.length - 1]
          })
        return {
          posts: result,
          isLast: querySnapShot.empty,
          lastDoc: querySnapShot.docs[querySnapShot.docs.length - 1]
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  getAllPostByUserId: async (uid: string) => {
    let allPost: Post[] = []

    const q = query(
      collection(firestore, FIRESTORE_ENDPOINT.POSTS),
      orderBy('createdAt', 'desc'),
      where('authorId', '==', uid)
    )

    const querySnapshot = await getDocs(q)

    const promises = querySnapshot.docs.map(async _doc => {
      const creatorDocRef = _doc.data().creator
      const creator = await getDoc(creatorDocRef)
      return {
        id: _doc.id,
        ..._doc.data(),
        creator: creator.data(),
        createdAt:
          typeof _doc.data().createdAt === 'number'
            ? _doc.data().createdAt
            : _doc.data().createdAt.toDate().getTime()
      } as Post
    })

    allPost = await Promise.all(promises)
    return allPost
  },

  getFirstSharedPost: async (post: Post) => {
    let sharedPost = post

    while (sharedPost.content.sharedPostId) {
      const result = await postService.getSinglePostById(sharedPost.content.sharedPostId)
      if (!result) return result

      sharedPost = result
    }

    return sharedPost
  }
}
