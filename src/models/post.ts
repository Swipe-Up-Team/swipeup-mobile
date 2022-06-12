import { DocumentReference, DocumentData } from 'firebase/firestore'
import { User } from './user'

export interface Post {
  id: string
  creator: User
  reacts?: Reaction[]
  shares?: number
  createdAt?: number
  updatedAt?: number
  content: {
    sharedPostId?: string
    text: string
    images?: string[]
  }
  type?: string
  authorId?: string
  comments?: number
}

export interface PostPayload extends Omit<Post, 'creator'> {
  creator: DocumentReference<DocumentData>
}

// enum ReactionEnum {
//   LIKE = 'like',
//   LOVE = 'love',
//   HAHA = 'haha',
//   WOW = 'wow',
//   SAD = 'sad',
//   ANGRY = 'angry'
// }

// REACT
export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
export interface Reaction {
  type: ReactionType
  userId: string
}
// export type Reactions = {
//   [key in ReactionEnum]: number
// }

export type Reactions = Partial<Record<ReactionType, number>>

export interface PostsResponseData {
  id: string
  creator: string
  reacts: Reaction[]
  shares: number
  createdAt: string
  updatedAt: string
  content: {
    sharedPostId?: string
    text: string
    images?: string[]
  }
  type: string
  authorId: string
  comments: string[]
}

// COMMENT
export interface Comment {
  id?: string
  reacts?: Reaction[]
  authorId: string
  images?: string[]
  text?: string
  postId: string
  createdAt: number
  updatedAt: number
  repliesId?: string[]
  replyToCommentIds?: string[]
}

export interface CommentPayload extends Partial<Comment> {}

export interface CommentResponseData {
  id: string
  reacts: Reaction[]
  author: User
  images?: string[]
  text?: string
  postId: string
  createdAt: number
  updatedAt: number
  repliesId?: string[]
  replyToCommentIds?: string[]
}
