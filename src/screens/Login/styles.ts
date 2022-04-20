import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',

    marginTop: 60
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center'
  },
  banner: {
    width: 250,
    height: 250
  },
  loginSection: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30
  },
  loginText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#121515'
  }
})

export default styles
