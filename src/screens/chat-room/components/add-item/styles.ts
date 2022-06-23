import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  insideContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainAvatar: {
    height: 40,
    width: 40,
    borderRadius: 100
  },
  nameText: {
    marginLeft: 10,
    fontWeight: '500'
  },
  addBtn: {
    borderWidth: 0
  }
})

export default styles
