import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    paddingTop: StatusBar.currentHeight ?? 40,
    paddingHorizontal: 20
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default styles
