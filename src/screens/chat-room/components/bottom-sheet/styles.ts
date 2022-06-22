import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  avatarImage: {
    transform: [{ translateY: -50 }]
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    transform: [{ translateY: -20 }]
  },
  emailText: {
    color: '#aaa',
    transform: [{ translateY: -20 }]
  },
  actionBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  profileBtn: {
    width: '100%',
    borderWidth: 0
  },
  btnContainer: {
    alignItems: 'center'
  },
  actionBtn: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descText: {
    fontWeight: '600',
    marginTop: 6
  }
})

export default styles
