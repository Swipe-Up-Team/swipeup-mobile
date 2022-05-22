import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
