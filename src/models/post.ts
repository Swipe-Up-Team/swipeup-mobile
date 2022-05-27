import { User } from './user'

export interface Post {
  id: string
  creator: User
  reactions: Reactions
  comments: number
  shares: number
  createdAt: string
  desc?: string
  images?: string[]
}

// enum ReactionEnum {
//   LIKE = 'like',
//   LOVE = 'love',
//   HAHA = 'haha',
//   WOW = 'wow',
//   SAD = 'sad',
//   ANGRY = 'angry'
// }

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

// export type Reactions = {
//   [key in ReactionEnum]: number
// }

export type Reactions = Partial<Record<ReactionType, number>>
