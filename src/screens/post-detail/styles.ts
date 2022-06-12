import { BOTTOM_TAB_BAR_HEIGHT } from '@src/constants'
import { getRealDimensionsHeight } from '@src/utils'
import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: getRealDimensionsHeight(),
    width: '100%'
  },
  keyboardAvoidingViewContainer: {
    position: 'relative',
    height:
      getRealDimensionsHeight() - 44 - (StatusBar.currentHeight ?? 30) - BOTTOM_TAB_BAR_HEIGHT - 20
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  commentListContainer: {
    // height
    height: getRealDimensionsHeight() - 44 - (StatusBar.currentHeight ?? 60) - BOTTOM_TAB_BAR_HEIGHT
  },
  commentsContentContainer: {}
})
export default styles
