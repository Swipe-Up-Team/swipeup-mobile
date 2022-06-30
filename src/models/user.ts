export enum UserGender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2
}

export enum UserStatus {
  PRIVATE = 0,
  PUBLIC = 1
}

export interface BirthDay {
  date: number
  month: number
  year: number
}

export interface User {
  id: string
  email: string
  name: string
  status?: UserStatus
  avatar?: string
  bio?: string
  birthDay?: BirthDay
  gender?: UserGender
  phone?: string
  followingIDs?: string[]
  createdAt?: number
  updatedAt?: number
}
