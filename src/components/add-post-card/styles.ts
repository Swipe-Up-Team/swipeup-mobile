import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: '#F5F2F2',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    marginTop: 40,
    marginHorizontal: 15
  },
  postToolWrapper: {
    padding: 10,
    flexDirection: 'row'
  },
  postOptionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  postOptionItemWrapper: {
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: '#F5F2F2',
    paddingVertical: 10,
    height: 40,
    marginRight: 10,

    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lastPostOptionItemWrapper: {
    marginRight: 0,
    flex: 1,
    justifyContent: 'center'
  },
  postOptionItem: {},
  postOptionItemText: {
    marginHorizontal: 5,
    fontWeight: '600',
    fontSize: 13
  },
  postOptionIcon: {
    marginRight: 5
  },
  postInputWrapper: {
    flex: 1,
    marginLeft: 5
  },
  postInput: {
    justifyContent: 'center',
    borderRadius: 48,
    height: 40,
    width: '100%',
    paddingHorizontal: 10
  },
  postInputPlaceholder: {
    fontSize: 13
  },
  userAvatar: {
    width: 40,
    height: 40
  },
  userAvatarWrapper: {
    height: 40,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden'
  }
})
export default styles
