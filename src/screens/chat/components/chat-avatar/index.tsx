import { DEFAULT_PHOTO_URI } from '@src/constants'
import { Avatar, Layout } from '@ui-kitten/components'
import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const ChatAvatar = ({ avatar }: any) => {
  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        size="giant"
        shape="rounded"
        source={{uri: avatar || DEFAULT_PHOTO_URI}}
      />
      <View style={styles.circleStatus} />
    </View>
  )
}

export default ChatAvatar
