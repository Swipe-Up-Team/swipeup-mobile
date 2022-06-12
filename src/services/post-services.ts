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
  where
} from 'firebase/firestore'

export const postService = {
  createNew: async (creator: User, post: Partial<PostPayload>) => {
    const editedPost: Partial<PostPayload> = {
      ...post,
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
            // TODO: change to in [followingIDs]
            where('authorId', '==', 'Wx2OS5Iq2lWaQZV1ne6ob8qh3At2'),
            orderBy('createdAt', 'desc'),
            limit(pagination?.limit || 10),
            startAfter(pagination.startAfter)
          )
        : query(
            postsRef,
            // TODO: change to in [followingIDs]
            where('authorId', '==', 'Wx2OS5Iq2lWaQZV1ne6ob8qh3At2'),
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
  }
}
