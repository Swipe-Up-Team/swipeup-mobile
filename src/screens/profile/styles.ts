import { BOTTOM_TAB_BAR_HEIGHT, SCREEN_WIDTH } from '@src/constants'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  profileContainer: {
    width: SCREEN_WIDTH
  },

  w_full: {
    width: '100%'
  },
  posts: {
    flex: 1,
    marginBottom: BOTTOM_TAB_BAR_HEIGHT + 50
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
  }
})

export default styles
