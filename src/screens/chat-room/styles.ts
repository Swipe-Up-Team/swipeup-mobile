import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: getRealDimensionsHeight(),
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight ?? 60,
    paddingBottom: 30,
  },
})

export default styles
