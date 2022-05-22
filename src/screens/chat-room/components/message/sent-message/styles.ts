import { StyleSheet } from 'react-native'
import { getRealDimensionsHeight } from '@src/utils'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 4,
  },
  mainContainer: {
    maxWidth: '80%',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  messageContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#5243AA',
    borderRadius: 6,
  },
  messageText: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 6,
  }
})

export default styles
