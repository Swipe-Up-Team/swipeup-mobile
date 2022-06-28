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
    paddingBottom: 30
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  friendOnlineContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10
  },
  mainChatContainer: {
    flex: 1,
    width: '100%'
  },
  input: {
    width: '80%'
  }
})

export default styles
