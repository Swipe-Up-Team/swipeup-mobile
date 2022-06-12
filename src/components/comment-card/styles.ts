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
  },
  commentSection: {
    marginLeft: 55
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden'
  },
  userInfo: {
    marginLeft: 15,
    marginTop: 5
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
    lineHeight: 16
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
    margin: 10,
    marginLeft: -10
  }
})
export default styles
