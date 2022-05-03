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
  loginSection: {
    width: '100%',
    paddingHorizontal: 30
  },
  loginText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#121515'
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10
  },
  inputLabel: {},
  loginInput: {
    width: '100%',
    marginTop: 5
  },
  loginBtn: {
    width: '100%',
    marginTop: 20
  },
  dividerContainer: {
    marginVertical: 10
  },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 }
})

export default styles
