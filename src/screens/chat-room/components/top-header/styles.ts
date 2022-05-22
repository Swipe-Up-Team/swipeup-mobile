import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  backIcon: {
    width: 30,
    height: 30,
  },
  actionIconContainer: {
    marginRight: 6,
    padding: 6,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#999',
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    paddingTop: StatusBar.currentHeight ?? 40,
    paddingHorizontal: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default styles
