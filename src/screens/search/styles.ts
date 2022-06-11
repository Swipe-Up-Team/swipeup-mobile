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
  searchBarContainer: {
    width: '100%'
  },
  mainContent: {
    width: '100%',
    height: '100%'
  },
  recentSearchedContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#999'
  },
  title: {
    fontSize: 15,
    fontWeight: '600'
  }
})
export default styles
