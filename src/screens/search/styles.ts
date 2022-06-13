import { getRealDimensionsHeight } from '@src/utils'
import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: getRealDimensionsHeight(),
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight ?? 60,
    paddingBottom: 30
  },
  searchList: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  input: {
    width: '80%'
  }
})

export default styles
