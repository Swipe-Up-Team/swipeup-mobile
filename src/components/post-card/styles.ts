import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  post: {
    paddingTop: 20,
    paddingBottom: -5,
    width: '100%',
    backgroundColor: '#fff'
  },
  header: {
    paddingVertical: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  dots: {
    paddingVertical: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lightText: {
    color: 'grey'
  },
  creatorImage: {
    height: 40,
    width: 40,
    borderRadius: 5
  },
  createdAt: {
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 13
  },
  creatorName: {
    fontSize: 13,
    fontWeight: '600'
  },
  descriptionContainer: {
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  sharedPostContainer: {
    padding: 5,
    borderWidth: 1.2,
    borderRadius: 5,
    borderColor: '#F5F2F2',
    borderStyle: 'solid'
  },
  image: {
    height: 300,
    width: '100%'
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  sharesText: {
    marginLeft: 10,
    color: 'grey'
  },
  commentsText: {
    color: 'grey'
  },
  bottomBorder: {
    height: 1,
    backgroundColor: '#ebecf0',
    marginHorizontal: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 16
  }
})

export default styles
