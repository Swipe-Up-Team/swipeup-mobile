import { BOTTOM_TAB_BAR_HEIGHT } from '@src/constants'
import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getRealDimensionsHeight(),
    marginTop: 50,
    // FIXME: uncomment if finish home screen
    backgroundColor: '#fff'
  },
  posts: {
    flex: 1,
    marginBottom: BOTTOM_TAB_BAR_HEIGHT + 50
  },
  spinnerContainer: { height: 40, width: '100%', alignItems: 'center' }
})

export default styles
