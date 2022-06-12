import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    width: screenWidth - 30,
    height: 240
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  },
  paginationContainer: { paddingVertical: 10 },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -4,
    backgroundColor: '#5243AA'
  },
  inactiveDotStyle: {
    backgroundColor: '#CCD2E3'
  }
})
export default styles
