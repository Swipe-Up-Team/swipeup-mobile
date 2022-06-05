import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnBack: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  titleContainer: {
    position: 'absolute',
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  accessoryRight: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default styles
