export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  AUTHORIZE = 'AUTHORIZE',
  HOME = 'HOME',
  CHAT = 'CHAT',
  CHAT_ROOM = 'CHAT_ROOM',
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined
  [APP_SCREEN.SIGNUP]: undefined
  [APP_SCREEN.SPLASH]: undefined
}

export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined
  [APP_SCREEN.CHAT]: undefined
  [APP_SCREEN.CHAT_ROOM]: undefined
}

export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined
  [APP_SCREEN.AUTHORIZE]: undefined
} & UnAuthorizeParamsList &
  AuthorizeParamsList
