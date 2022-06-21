import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // marginTop: 24,
    backgroundColor: '#fff'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44
  },
  btnGoBack: {
    height: 44,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontSize: 18,
    fontWeight: '500'
  },
  tabBar: {
    alignSelf: 'center'
  },
  indicator: {
    width: '70%',
    height: 3
  },
  input: {
    width: '100%',
    marginVertical: 16,
    borderWidth: 0
  }
})

export default styles
