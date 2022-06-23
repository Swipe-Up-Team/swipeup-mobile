import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import strings from './string/index'
export const R = { strings }

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight()
export const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)

export const DEFAULT_PHOTO_URI =
  'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'

export const DEFAULT_GROUP_URI =
  'https://cdn-icons.flaticon.com/png/512/1921/premium/1921935.png?token=exp=1655920593~hmac=7c95a9842d9736820f18b034c839f4db'

export const DEFAULT_BACKGROUND_URI =
  'https://images.unsplash.com/photo-1654859342606-92b2517c4289?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80'

export * from './regex'
export * from './enums'
export * from './reaction-images'
export * from './ui'
export * from './firebase-error-code'
export * from './firesbase-endpoint'
export * from './chat'
export * from './draft'
