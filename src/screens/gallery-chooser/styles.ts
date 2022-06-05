import { Dimensions, StyleSheet } from 'react-native'

const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  doneButton: {
    marginRight: 15
  },
  btnEsc: {},
  cameraRollWrapper: {
    justifyContent: 'space-between'
  },
  cameraRollImageWrapper: {
    width: screenWidth / 3 - 2 + 2,
    height: screenWidth / 3 - 2,
    marginRight: 1,
    marginBottom: 1,
    position: 'relative',
    borderColor: '#3D3092'
  },
  cameraRollImage: {
    width: '100%',
    height: '100%'
  },
  selectedCount: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#3D3092',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})
export default styles
