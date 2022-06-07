/* eslint-disable @typescript-eslint/naming-convention */
import { Post } from '@src/models/post'

export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  AUTHORIZE = 'AUTHORIZE',

  // FEED
  HOME_STACK = 'HOME_STACK',
  HOME = 'HOME',
  POST_DETAILS = 'POST_DETAILS',
  FEED_IMAGE_PREVIEW = 'FEED_IMAGE_PREVIEW',
  ADD_POST = 'ADD_POST',

  PHOTO_CHOOSER = 'PHOTO_CHOOSER',

  SEARCH = 'SEARCH',
  NOTIFICATIONS = 'NOTIFICATIONS',
  MENU = 'MENU',
  CHAT = 'CHAT',
  CHAT_ROOM = 'CHAT_ROOM'
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined
  [APP_SCREEN.SIGNUP]: undefined
  [APP_SCREEN.SPLASH]: undefined
}

export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined
  [APP_SCREEN.POST_DETAILS]: {
    post: Post
  }
  [APP_SCREEN.FEED_IMAGE_PREVIEW]: {
    images: string[]
  }
  [APP_SCREEN.PHOTO_CHOOSER]: undefined
  [APP_SCREEN.ADD_POST]: undefined
  [APP_SCREEN.CHAT]: undefined
  [APP_SCREEN.CHAT_ROOM]: {
    conversationId: string
  }
}

export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined
  [APP_SCREEN.AUTHORIZE]: undefined
} & UnAuthorizeParamsList &
  AuthorizeParamsList
