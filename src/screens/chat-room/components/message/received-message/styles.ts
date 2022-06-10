import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10,
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
  mainTextContainer: {
    maxWidth: '80%',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  imageMessage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 6,
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
