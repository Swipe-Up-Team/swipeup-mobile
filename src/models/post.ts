import { User } from './user'

export interface Post {
  id: string
  creator: User
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
  comments: Comment[]
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

export interface PostsResponseData {}

// COMMENT
export interface Comment {
  id: string
  reacts: Reaction[]
  authorId: string
  images?: string[]
  text?: string
  postId: string
  createdAt: string
  updatedAt: string
  repliesId?: string[]
  replyToCommentIds?: string[]
}
