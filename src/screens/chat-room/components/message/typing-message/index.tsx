import { View } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'
import LottieView from 'lottie-react-native'

const TypingMessage = () => {
  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="medium"
        borderRadius={4}
        source={require('@assets/image/img-avatar.jpg')}
      />
      <View style={styles.messageContainer}>
        <LottieView
          style={styles.lottieView}
          source={require('@assets/lottie/typing-message.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default TypingMessage
