import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    // position: 'absolute',
    // bottom: 30,
    // left: 0,
    // right: 0,
  },
  avatar: {
    marginLeft: 10,
    marginRight: 6,
  },
  messageContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: '#f4f5f7',
    borderRadius: 6,
  },
  lottieView: {
    width: 40,
    height: 40,
  },
})

export default styles
