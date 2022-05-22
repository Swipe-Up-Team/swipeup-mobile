import { Avatar, Layout } from '@ui-kitten/components'
import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const ChatAvatar = () => {
  return (
    <View style={styles.container} >
      <Avatar
        style={styles.avatar}
        size="giant"
        shape="rounded"
        source={require('@assets/image/img-avatar.jpg')}
      />
      <View style={styles.circleStatus} />
    </View>
  )
}

export default ChatAvatar
