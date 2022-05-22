import { StyleSheet } from 'react-native'
import { getRealDimensionsHeight } from '@src/utils'
import { StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: getRealDimensionsHeight() + (StatusBar.currentHeight ?? 0),
    backgroundColor: '#fff',
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
})

export default styles
