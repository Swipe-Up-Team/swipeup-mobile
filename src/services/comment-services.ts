import { getState } from '@src/common'
import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT } from '@src/constants'
import { CommentPayload, CommentResponseData, Reaction, User } from '@src/models'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

export const commentService = {
  addNew: async (postId: string, comment: CommentPayload) => {
    try {
      const editedComment: CommentPayload = {
        ...comment,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      }

      const commentsRef = collection(
        firestore,
        FIRESTORE_ENDPOINT.POSTS,
        postId,
        FIRESTORE_ENDPOINT.COMMENTS
      )
      const result = await addDoc(commentsRef, editedComment)
      return result
    } catch (error) {
      console.log(error)
    }
  },

  likeComment: async (postId: string, commentId: string, _isLiked: boolean) => {
    const { user } = getState('user')
    if (!user) return

    const reactionCollectionRef = collection(
      firestore,
      FIRESTORE_ENDPOINT.POSTS,
      postId,
      FIRESTORE_ENDPOINT.COMMENTS,
      commentId,
      FIRESTORE_ENDPOINT.REACTIONS
    )

    const queryRef = query(reactionCollectionRef)
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

  getList: async (postId: string, { onNext }: { onNext?: (result: any) => void }) => {
    try {
      const commentsRef = collection(
        firestore,
        FIRESTORE_ENDPOINT.POSTS,
        postId,
        FIRESTORE_ENDPOINT.COMMENTS
      )

      const queryRef = query(commentsRef, orderBy('createdAt'))

      return onSnapshot(queryRef, async docSnapshot => {
        const promises = docSnapshot.docs.map(async _doc => {
          const authorId = _doc.data().authorId

          const author = await getDoc(doc(firestore, FIRESTORE_ENDPOINT.USERS, authorId))

          const reactionCollectionRef = collection(
            firestore,
            FIRESTORE_ENDPOINT.POSTS,
            postId,
            FIRESTORE_ENDPOINT.COMMENTS,
            _doc.id,
            FIRESTORE_ENDPOINT.REACTIONS
          )
          const reactions = await getDocs(reactionCollectionRef)

          return {
            ..._doc.data(),
            id: _doc.id,
            reacts: reactions.docs.map(_ => _.data()),
            author: author.data() as User
          } as CommentResponseData
        })

        const result = await Promise.all(promises)
        if (onNext)
          onNext({
            comments: result
          })
        return {
          comments: result
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
