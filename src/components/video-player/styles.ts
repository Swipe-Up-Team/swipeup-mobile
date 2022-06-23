import { StyleSheet } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'

const styles = StyleSheet.create({
  postWrapper: {
    borderRadius: 6,
    overflow: 'hidden'
  },
  optionListWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 9999999999,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    width: SCREEN_WIDTH
  },
  allOptionWrapper: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH / 3,
    padding: 20,
    height: '100%'
  },
  optionBackDrop: {
    width: (SCREEN_WIDTH / 3) * 2,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 999,
    height: '100%',
    flex: 2
  },
  optionItemWrapper: {
    paddingVertical: 15,
    justifyContent: 'center'
  },
  optionText: {
    fontSize: 16
  },
  postContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  videoToolWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%'
  },
  btnControlWrapper: {
    alignItems: 'center'
  },
  videoToolBar: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 3,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  timeBar: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 30 - 40,
    alignItems: 'center',
    flex: 1
  },
  currentTime: {
    color: '#fff',
    fontWeight: '500',
    width: 50,
    textAlign: 'center'
  },
  timingBar: {
    position: 'relative',
    width: SCREEN_WIDTH - 40 - 100 - 20 - 25,
    height: 5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.4)'
  },
  playedBar: {
    height: 5,
    left: 0,
    top: 0,
    backgroundColor: '#5243AA',
    zIndex: 1
  },
  btnTimeControl: {
    zIndex: 2,
    width: 15,
    height: 15,
    borderRadius: 50,
    position: 'absolute',
    top: -(15 - 5) / 2,
    backgroundColor: '#fff'
  },
  maxTime: {
    color: '#fff',
    fontWeight: '500',
    width: 50,
    textAlign: 'center'
  },
  btnSetting: {
    width: 40,
    alignItems: 'flex-end'
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  video: {
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 0
  }
})
export default styles
