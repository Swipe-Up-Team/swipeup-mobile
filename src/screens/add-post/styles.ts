import { getRealDimensionsHeight } from '@src/utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  parentContainer: {
    height: getRealDimensionsHeight(),
    position: 'relative'
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 50
  },
  naviIcon: {
    padding: 10
  },
  naviTitle: {
    paddingHorizontal: 10,
    fontSize: 16
  },
  btnPost: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center'
  },
  infoWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1.2,
    borderTopColor: '#F5F2F2'
  },
  avatar: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 5
  },
  areaWrapper: {
    flexDirection: 'row'
  },
  areaOption: {
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  editorWrapper: {
    overflow: 'hidden',
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },
  editor: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    fontSize: 26,
    textAlign: 'center',
    color: '#2B3D5C',
    fontWeight: 'bold'
  },
  toolOptionsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingBottom: 55
  },
  optionsWrapper: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    left: 0,
    zIndex: 999999,
    transform: [{ translateY: 710 }]
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    height: 55,
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1
  },
  optionText: {
    fontSize: 16
  },
  optionImagesWrapper: {
    flexDirection: 'row',
    zIndex: 1
  },
  optionImage: {
    height: 25,
    resizeMode: 'contain'
  },
  bgColorsWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50
  },
  bgColorsScrollView: {
    flexDirection: 'row'
  },
  btnBgColor: {
    height: 30,
    width: 30
  },
  bgColor: {
    height: 30,
    width: 30,
    marginHorizontal: 5
  },
  bgImage: {
    resizeMode: 'cover',
    height: 30,
    width: 30,
    borderRadius: 10,
    borderWidth: 1
  },
  toggleBgColors: {
    padding: 5,
    borderWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0
  },
  moreBgColors: {}
})
export default styles
