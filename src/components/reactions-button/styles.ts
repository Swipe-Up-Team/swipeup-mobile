import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  // Box
  viewBox: {
    borderRadius: 30,
    width: 320,
    height: 50,
    top: -90,
    position: 'absolute',
    // Has to set color for elevation
    backgroundColor: '#fff'
    // elevation: 6,
  },
  // Button like
  viewBtn: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  textBtn: {
    color: 'grey',
    fontSize: 14,
    fontWeight: 'bold'
  },
  imgLikeInBtn: {
    width: 25,
    height: 25
  },
  // Group icon
  viewWrapGroupIcon: {
    flexDirection: 'row',
    width: 320,
    height: 100,
    zIndex: 3000,
    position: 'absolute',
    borderColor: 'blue',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingLeft: 5,
    paddingRight: 5
  },
  viewWrapIcon: {
    zIndex: 3000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgIcon: {
    width: 36,
    height: 36
  },
  viewWrapTextDescription: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    position: 'absolute'
  },
  textDescription: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 16
  },
  // Group jump icon
  viewWrapGroupJumpIcon: {
    flexDirection: 'row',
    width: 330,
    height: 140,
    borderColor: 'green',
    marginLeft: 10,
    position: 'absolute',
    alignItems: 'flex-end'
  }
})
export default styles
