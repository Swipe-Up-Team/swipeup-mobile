import { BOTTOM_TAB_BAR_HEIGHT } from '@src/constants'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rootContainer: {
    height: BOTTOM_TAB_BAR_HEIGHT,
    position: 'absolute'
  },
  tabBarItemContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default styles
