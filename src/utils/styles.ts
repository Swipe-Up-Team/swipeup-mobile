import { Dimensions, Platform, StatusBar } from 'react-native'

export const getRealDimensionsHeight = () => {
  return Platform.OS === 'android'
    ? Dimensions.get('screen').height - (StatusBar.currentHeight ?? 0)
    : Dimensions.get('window').height
}
