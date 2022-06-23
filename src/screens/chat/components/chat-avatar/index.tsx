import { DEFAULT_PHOTO_URI } from '@src/constants'
import { Avatar } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'

const ChatAvatar = ({ avatar, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar
        style={styles.avatar}
        size="giant"
        shape="rounded"
        source={{ uri: avatar || DEFAULT_PHOTO_URI, cache: 'force-cache' }}
      />
      <View style={styles.circleStatus} />
    </TouchableOpacity>
  )
}

export default ChatAvatar
