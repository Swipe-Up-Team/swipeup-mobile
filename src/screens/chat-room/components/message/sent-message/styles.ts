import { StyleSheet } from 'react-native'
import { getRealDimensionsHeight } from '@src/utils'

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 8,
    marginBottom: 8
  },
  divider: {
    flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    opacity: 0.2
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
  mainContainer: {
    maxWidth: '80%',
    marginRight: 10,
    alignItems: 'flex-end'
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
