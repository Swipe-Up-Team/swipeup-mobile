import { View } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'

const ReceivedMessage = () => {
  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="medium"
        borderRadius={4}
        source={require('@assets/avatar.jpg')}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.timeText}>12:35</Text>

        <View style={styles.messageContainer}>
          <Text>abcdhfahf f hiufehes fiusef sfue sefehsuf suie da uwdha dau dww</Text>
        </View>
      </View>
    </View>
  )
}

export default ReceivedMessage
