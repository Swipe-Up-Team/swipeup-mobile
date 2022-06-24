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
    alignItems: 'center',
    zIndex: 99
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    marginLeft: 24
  },
  accessoryRight: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default styles
