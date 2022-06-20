import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 5
    // shadowColor: '#171717',
    // shadowOffset: { width: -2, height: -4 },
    // shadowOpacity: 0.08,
    // shadowRadius: 3,
    // elevation: 4
    // backgroundColor: 'green'
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden'
  },
  input: {
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width - 100
  },
  sendButton: {
    opacity: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
