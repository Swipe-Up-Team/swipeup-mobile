import React from 'react'
import { useSelector } from '@src/common'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { Avatar } from '@ui-kitten/components'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import styles from './styles'

const TypingMessage = ({ typingId }: any) => {
  const typingUser = useSelector(x => x.user.followingUsers?.find(user => user.id === typingId))

  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="medium"
        borderRadius={4}
        source={{ uri: typingUser?.avatar || DEFAULT_PHOTO_URI }}
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
