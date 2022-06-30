import { Message, MESSAGE_TYPE, User } from '@src/models'

export const BOT_ID = '-1'
export const BOT_NAME = 'BOT.JARVIS'
export const CHATBOT_AVATAR = require('@assets/icon/icon-robot.png')

export const BOT: User = {
  id: BOT_ID,
  email: '',
  name: BOT_NAME
}

export const initialChatbotMessages: Message[] = [
  {
    id: '1',
    type: MESSAGE_TYPE.MESSAGE,
    senderId: BOT_ID,
    message: 'Hello there!',
    image: '',
    createdAt: new Date().getTime()
  },
  {
    id: '2',
    type: MESSAGE_TYPE.MESSAGE,
    senderId: BOT_ID,
    message:
      'I am JARVIS and I can help you keep yourself safely in the Covid era by providing many useful informations',
    image: '',
    createdAt: new Date().getTime()
  }
]
