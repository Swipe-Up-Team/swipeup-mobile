import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: getRealDimensionsHeight(),
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 30
  },
  keyboardAvoidingViewContainer: {
    height: getRealDimensionsHeight(),
    width: '100%'
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    width: '100%',
    height: '100%'
  },
  searchList: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 12,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    paddingHorizontal: 15
  },

  noResultContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 100
    // backgroundColor: 'red'
  },
  noResultTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 8
  },
  banner: {
    width: 330,
    height: 310
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  }
})

export default styles
