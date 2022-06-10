import { Dimensions } from 'react-native'
// import { getStatusBarHeight } from 'react-native-status-bar-height'
import strings from './string/index'
export const R = { strings }

// export const STATUS_BAR_HEIGHT: number = getStatusBarHeight()
export const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)

export * from './regex'
export * from './enums'
export * from './reaction-images'
export * from './ui'
export * from './firebase-error-code'
export * from './firesbase-endpoint'
export * from './chat'
export * from './draft'
