import { StyleSheet } from 'react-native'
import { getRealDimensionsHeight } from '@src/utils'

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10
  },
  dateText: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 6,
    opacity: 0.6
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 4
  },
  mainTextContainer: {
    maxWidth: '80%',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  imageMessage: {
    width: 150,
    // maxHeight: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  messageContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#5243AA',
    borderRadius: 6
  },
  messageText: {
    color: '#fff'
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 6
  }
})

export default styles
