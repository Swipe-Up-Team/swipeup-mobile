import { Comment, Post } from './post'
import { User } from './user'

export type Notification = {
  userId?: string[]
  uid?: number
  type?: number
  froms?: string[]
  postId?: string
  commentId?: number
  replyId?: number
  storyId?: number
  createdAt?: string
  seen?: number
}

export type ExtraNotification = Notification & {
  postInfo?: Post
  commentInfo?: Comment
  previewFroms?: User[]
  replyInfo?: Comment
}
