import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20
  },
  listContainer: {},
  contentContainer: {},

  footerContainer: {
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontWeight: '400'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: getRealDimensionsHeight(),
    width: '100%'
  }
})

export default styles
