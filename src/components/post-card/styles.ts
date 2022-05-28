import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  post: {
    paddingTop: 20,
    paddingBottom: 25,
    width: '100%',
    backgroundColor: '#fff'
  },
  header: {
    padding: 15,
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
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 13,
    marginTop: 3
  },
  creatorName: {
    fontWeight: 'bold'
  },
  descriptionContainer: {
    marginBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  image: {
    height: 300,
    width: '100%'
  },
  reactionsContainer: {
    top: 10,
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
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  buttonContainer: {
    padding: 10,
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
