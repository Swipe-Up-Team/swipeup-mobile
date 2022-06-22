import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  container: {
    // height: SCREEN_HEIGHT - 15,
    height: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  commentContainer: {
    marginVertical: 5
    // paddingHorizontal: 5
  },
  innerContainer: {
    flexDirection: 'row'
  },
  commentSection: {
    backgroundColor: '#fafafa',
    marginLeft: 8,
    paddingLeft: 8,
    paddingRight: 28,
    paddingBottom: 8,
    borderRadius: 6
  },
  userInfo: {
    height: 40,
    justifyContent: 'center'
  },
  creatorName: {
    fontSize: 13,
    fontWeight: '600'
  },
  createdAt: {
    fontSize: 10,
    fontWeight: '600'
  },
  comment: {
    fontSize: 13,
    lineHeight: 16,
    marginRight: 20
  },
  lightText: {
    fontSize: 13,
    fontWeight: '600'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionContainer: {
    paddingLeft: 40
  }
})
export default styles
