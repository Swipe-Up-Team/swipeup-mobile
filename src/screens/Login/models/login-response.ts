import { Tokens, User } from '@src/models'

export interface LoginResponseData {
  info: User
  tokens: Tokens
}
