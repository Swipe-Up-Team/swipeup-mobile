import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headerBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarWrapper: {
    // position: 'relative'
  },
  mainAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  changeAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  plusIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#318bfb',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff'
  },
  btnEditProfile: {
    width: 30,
    height: 30,
    marginTop: 50
  },
  font_medium: {
    fontWeight: '500'
  },
  imageBackground: {
    position: 'absolute',
    height: 300,
    top: 0,
    left: 0,
    right: 0
    // overflow: 'hidden',
    // borderRadius: 30,
  },
  backArrow: {
    margin: 10
  }
})

export default styles
