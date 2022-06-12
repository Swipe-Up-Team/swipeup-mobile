import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT } from '@src/constants'
import {
  Comment,
  CommentPayload,
  CommentResponseData,
  FirebasePagination,
  Post,
  User
} from '@src/models'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'

export const commentService = {
  addNew: async (postId: string, comment: CommentPayload) => {
    try {
      const editedComment: CommentPayload = {
        ...comment,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        reacts: comment.reacts || []
      }
      const postRef = doc(firestore, FIRESTORE_ENDPOINT.POSTS, postId)
      const result = await updateDoc(postRef, {
        comments: arrayUnion(editedComment)
      })
      return result
    } catch (error) {
      console.log(error)
    }
  },

  getList: async (postId: string, { onNext }: { onNext?: (result: any) => void }) => {
    try {
      const postRef = doc(firestore, FIRESTORE_ENDPOINT.POSTS, postId)

      return onSnapshot(postRef, async docSnapshot => {
        const { comments } = docSnapshot.data() as Post

        const promises = (comments || []).map(async (comment: Comment) => {
          const authorId = comment.authorId

          const author = await getDoc(doc(firestore, FIRESTORE_ENDPOINT.USERS, authorId))
          return {
            ...comment,
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
