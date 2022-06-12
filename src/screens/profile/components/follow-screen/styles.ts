import { StyleSheet } from 'react-native'
import { DEFAULT_PHOTO_URI, SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // marginTop: 24,
    backgroundColor: '#fff'
  },
  navigationBar: {
    height: 88,
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 2
  },
  btnGoBack: {
    height: 44,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    height: 44,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContainer: {
    width: SCREEN_WIDTH
  },
  tabLine: {
    position: 'absolute',
    height: 2,
    width: SCREEN_WIDTH / 2,
    backgroundColor: '#333',
    top: '100%',
    zIndex: 1
  },
  userItem: {
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnFollow: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: '#333',
    borderWidth: 0.3
  },
  confirmWrapper: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingTop: 15,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  btnConfirm: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5,
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerList: {
    padding: 15,
    paddingBottom: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.3
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#318bfb'
  }
})

export default styles