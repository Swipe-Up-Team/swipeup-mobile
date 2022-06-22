import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 40,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5
  },
  goBackArea: {
    height: '100%',
    width: '100%'
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  },
  movableLine: {
    marginBottom: 10,
    height: 3,
    width: 40,
    backgroundColor: '#999',
    borderRadius: 2
  },
  optionItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  optionItemIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  optionItemContent: {},
  optionItemText: { fontSize: 16 },
  optionItemTextDanger: {},
  smallDescription: {
    fontSize: 12
  }
})
export default styles
