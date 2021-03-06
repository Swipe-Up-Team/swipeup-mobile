import React from 'react'
import ExpoFastImage from 'expo-fast-image'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import { APP_SCREEN } from '@src/navigation/screen-types'

export const SearchItem = ({ user, navigation }: any) => {
  const onItemClick = () => {
    navigation.push(APP_SCREEN.PROFILE, { userId: user.id })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onItemClick}>
      <ExpoFastImage
        style={styles.mainAvatar}
        source={{
          uri: user.avatar || DEFAULT_PHOTO_URI,
          cache: 'force-cache'
        }}
      />
      <Text style={styles.nameText}>{user.name}</Text>
    </TouchableOpacity>
  )
}
