import { getState } from '@src/common'
import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT } from '@src/constants'
import { FirebasePagination, Post, PostPayload, Reaction, User } from '@src/models'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
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
      comments: post.comments || [],
      reacts: post.reacts || [],
      creator: doc(firestore, `${FIRESTORE_ENDPOINT.USERS}/${creator.id}`)
    }
    try {
      const result = await addDoc(collection(firestore, FIRESTORE_ENDPOINT.POSTS), editedPost)
      return result
    } catch (error) {
      console.log(error)
    }
  },

  likePost: async (postId: string, _isLiked: boolean) => {
    const { user } = getState('user')
    if (!user) return

    const postRef = doc(firestore, FIRESTORE_ENDPOINT.POSTS, postId)
    const postSnap = await getDoc(postRef)

    if (!postSnap.exists()) throw new Error(`The post has ID ${postId} is not found.`)

    const reaction: Reaction = { userId: user?.id, type: 'like' }
    try {
      if (_isLiked) {
        await updateDoc(postRef, {
          reacts: arrayUnion(reaction)
        })
      } else {
        await updateDoc(postRef, {
          reacts: arrayRemove(reaction)
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getList: async (
    pagination: FirebasePagination,
    { onNext }: { onNext?: (result: any) => void }
  ) => {
    console.log('get 1 time')
    try {
      const postRef = collection(firestore, FIRESTORE_ENDPOINT.POSTS)

      const queryRef = pagination.startAfter
        ? query(
            postRef,
            // TODO: change to in [followingIDs]
            // where('authorId', '==', 'Wx2OS5Iq2lWaQZV1ne6ob8qh3At2'),
            orderBy('createdAt', 'desc'),
            limit(pagination?.limit || 10),
            startAfter(pagination.startAfter)
          )
        : query(
            postRef,
            // TODO: change to in [followingIDs]
            // where('authorId', '==', 'Wx2OS5Iq2lWaQZV1ne6ob8qh3At2'),
            orderBy('createdAt', 'desc'),
            limit(pagination?.limit || 10)
          )
      // const querySnapShot = await getDocs(queryRef)
      return onSnapshot(queryRef, async querySnapShot => {
        const promises = querySnapShot.docs.map(async _doc => {
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
  }
}
