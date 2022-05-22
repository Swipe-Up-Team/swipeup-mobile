export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  AUTHORIZE = 'AUTHORIZE',
  HOME = 'Home',
  NOTIFICATIONS = 'Notifications',
  MENU = 'Menu'
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined
  [APP_SCREEN.SIGNUP]: undefined
  [APP_SCREEN.SPLASH]: undefined
}

export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined
}

export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined
  [APP_SCREEN.AUTHORIZE]: undefined
} & UnAuthorizeParamsList &
  AuthorizeParamsList
