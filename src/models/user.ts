export interface User {
  id: string
  name?: string
  picture?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  phone?: string
  followingIDs?: string[]
  createdAt?: string
  updatedAt?: string
  conversationId?: string
}
