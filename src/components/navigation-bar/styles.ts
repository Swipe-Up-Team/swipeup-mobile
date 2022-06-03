import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 44,
    width: '100%',
    alignItems: 'center'
  },
  btnBack: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    position: 'absolute',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
})
export default styles
