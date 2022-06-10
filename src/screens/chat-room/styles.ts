import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  topContainer: {
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
  topRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    height: getRealDimensionsHeight() + (StatusBar.currentHeight ?? 0),
    backgroundColor: '#fff'
  },
  optionIcon: {
    width: 24,
    height: 24
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  messageContentContainer: {
    justifyContent: 'flex-end'
  },
  selectedAssetsWrapper: {
    width: '100%'
  },
  selectedAssetsContentWrapper: {
    padding: 15
  },
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: '#fff'
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8
  },
  sendButton: {
    marginRight: 4
  },
  iconButton: {
    width: 24,
    height: 24
  }
})

export default styles
