import { Message, MESSAGE_TYPE, User } from '@src/models'

export const defaultUser: User = {
  id: '',
  email: '',
  name: '',
  status: 1,
  avatar: '',
  bio: '',
  birthDay: {
    date: 0,
    month: 0,
    year: 0
  },
  gender: 0,
  phone: '',
  followingIDs: [],
  createdAt: 0,
  updatedAt: 0
}

export const defaultMessage: Message = {
  id: '',
  senderId: '',
  message: '',
  image: '',
  createdAt: 0,
  type: MESSAGE_TYPE.MESSAGE
}
