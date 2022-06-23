import { DEFAULT_PHOTO_URI } from '@src/constants'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

const styles = StyleSheet.create({
  creatorImage: {
    height: 40,
    width: 40,
    borderRadius: 5
  }
})

const UserAvatarSquareComponent = ({ uri }: { uri?: string }) => {
  return <Image style={styles.creatorImage} uri={uri ? uri : DEFAULT_PHOTO_URI} />
}
export const UserAvatarSquare = memo(UserAvatarSquareComponent, isEqual)
