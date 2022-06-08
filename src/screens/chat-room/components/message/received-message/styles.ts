import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 6,
    opacity: 0.6,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 4,
    flexDirection: 'row',
  },
  avatar: {
    marginLeft: 10,
    marginRight: 6,
  },
  mainContainer: {
    maxWidth: '70%',
  },
  messageContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f4f5f7',
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
    marginLeft: 6,
  }
})

export default styles
