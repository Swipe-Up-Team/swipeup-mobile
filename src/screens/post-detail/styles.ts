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
    height: getRealDimensionsHeight() - 44 - (StatusBar.currentHeight ?? 30) - 40
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  commentListContainer: {
    // height
    height: getRealDimensionsHeight() - 44 - (StatusBar.currentHeight ?? 60)
  },
  commentsContentContainer: {}
})
export default styles
