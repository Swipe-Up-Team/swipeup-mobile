/* eslint-disable @typescript-eslint/naming-convention */
import { CONVERSATION_TYPE, Post, User } from '@src/models'
import * as MediaLibrary from 'expo-media-library'

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

  GALLERY_CHOOSER = 'GALLERY_CHOOSER',
  POST_STATUS_OPTIONS_MODAL = 'POST_STATUS_OPTIONS_MODAL',
  CHAT_USER_INFO_MODAL = 'CHAT_USER_INFO_MODAL',
  POST_OPTIONS_MODAL = 'POST_OPTIONS_MODAL',
  PROFILE_OPTIONS_MODAL = 'PROFILE_OPTIONS_MODAL',

  SHARE_POST = 'SHARE_POST',
  IMAGE_DETAIL = 'IMAGE_DETAIL',

  SEARCH = 'SEARCH',
  NOTIFICATIONS = 'NOTIFICATIONS',
  MENU = 'MENU',

  CHAT = 'CHAT',
  CHAT_ROOM = 'CHAT_ROOM',
  GROUP_MEMBER = 'GROUP_MEMBER',
  ADD_MEMBER = 'ADD_MEMBER',
  CHATBOT_ROOM = 'CHATBOT_ROOM',

  PROFILE = 'PROFILE',
  EDIT_PROFILE = 'EDIT_PROFILE',
  FOLLOWING = 'FOLLOW'
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined
  [APP_SCREEN.SIGNUP]: undefined
  [APP_SCREEN.SPLASH]: undefined
}

export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined
  [APP_SCREEN.POST_DETAILS]: {
    postId: string
  }
  [APP_SCREEN.FEED_IMAGE_PREVIEW]: {
    images: string[]
  }
  [APP_SCREEN.ADD_POST]: {
    selectedAssetIndexes?: number[]
    onSuccess?: (id: string) => void
  }
  [APP_SCREEN.GALLERY_CHOOSER]: {
    mediaType?: MediaLibrary.MediaTypeValue
    isMultiple?: boolean
    selectedAssets?: MediaLibrary.Asset[]
    prevScreen?: APP_SCREEN.ADD_POST | APP_SCREEN.CHAT_ROOM | APP_SCREEN.PROFILE
  }
  [APP_SCREEN.POST_STATUS_OPTIONS_MODAL]: undefined
  [APP_SCREEN.CHAT_USER_INFO_MODAL]: {
    conversationType: CONVERSATION_TYPE
    conversationId: string
  }
  [APP_SCREEN.POST_OPTIONS_MODAL]: {
    post: Post
  }
  [APP_SCREEN.SHARE_POST]: {
    post: Post
  }
  [APP_SCREEN.CHAT]: undefined
  [APP_SCREEN.CHAT_ROOM]: {
    conversationId: string
    selectedAssetIndexes?: number[]
  }
  [APP_SCREEN.CHATBOT_ROOM]: undefined
  [APP_SCREEN.GROUP_MEMBER]: {
    listMembers: User[]
  }
  [APP_SCREEN.ADD_MEMBER]: {
    conversationId: string
  }
  [APP_SCREEN.PROFILE]: {
    userId?: string
    newAvatar?: MediaLibrary.Asset
  }
  [APP_SCREEN.EDIT_PROFILE]: undefined
  [APP_SCREEN.FOLLOWING]: {
    user: User
  }
  [APP_SCREEN.IMAGE_DETAIL]: {
    imageUrl: string
  }
  [APP_SCREEN.PROFILE_OPTIONS_MODAL]: undefined
}

export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined
  [APP_SCREEN.AUTHORIZE]: undefined
} & UnAuthorizeParamsList &
  AuthorizeParamsList
