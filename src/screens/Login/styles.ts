import { getRealDimensionsHeight } from '@src/utils'
import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getRealDimensionsHeight(),
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerContainer: {
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight ?? 60,
    flex: 1
  },
  banner: {
    height: '100%'
  },
  dividerContainer: {
    marginVertical: 10,
    paddingHorizontal: 30
  },
  googleLoginContainer: { paddingHorizontal: 30, width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 }
})

export default styles
