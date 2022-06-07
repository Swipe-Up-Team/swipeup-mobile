import { View } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'
import { formatTime } from '@src/utils'

const ReceivedMessage = ({ message }: any) => {
  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="medium"
        borderRadius={4}
        source={require('@assets/image/img-avatar.jpg')}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>

        <View style={styles.messageContainer}>
          <Text>{message.message}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReceivedMessage
