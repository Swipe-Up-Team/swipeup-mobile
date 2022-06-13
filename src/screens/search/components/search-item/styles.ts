import { getRealDimensionsHeight } from '@src/utils'
import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  mainAvatar: {
    height: 40,
    width: 40,
    borderRadius: 100
  },
  nameText: {
    marginLeft: 10,
    fontWeight: '500'
  }
})

export default styles
