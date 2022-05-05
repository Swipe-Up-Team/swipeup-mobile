import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  },
  banner: {
    width: 250,
    height: 250
  },
  dividerContainer: {
    marginVertical: 10,
    paddingHorizontal: 30
  },
  googleLoginContainer: { paddingHorizontal: 30, width: '100%' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 }
})

export default styles
