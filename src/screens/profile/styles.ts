import { SCREEN_WIDTH } from '@src/constants'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    position: 'relative'
  },

  navigationBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999999999,
    backgroundColor: '#fff',
    height: 44
  },
  profileContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative'
  },

  w_full: {
    width: '100%'
  },
  posts: {
    marginTop: 44,
    flex: 1,
    paddingHorizontal: 15,
    width: '100%',
    height: '100%'
  },
  spinnerContainer: {
    height: 40,
    width: '100%',
    alignItems: 'center'
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#FCFCFC'
  },
  touch_center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_extra_info: {
    fontSize: 18,
    fontWeight: '500'
  },
  btnEditProfile: {
    marginVertical: 5,
    width: SCREEN_WIDTH - 100,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnMessage: {
    width: 30,
    height: 30,
    marginTop: 50
  },
  bioWrapper: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontWeight: '500',
    fontSize: 20
  },
  emailText: {
    color: 'grey',
    marginTop: 4
  },

  footerContainer: {
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontWeight: '400'
  }
})

export default styles
