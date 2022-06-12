import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Image as RNImage, StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

const styles = StyleSheet.create({
  creatorImage: {
    height: 40,
    width: 40,
    borderRadius: 5
  }
})

const UserAvatarSquareComponent = ({ uri }: { uri?: string }) => {
  if (uri) return <Image style={styles.creatorImage} uri={uri} />
  return (
    <RNImage style={styles.creatorImage} source={require('@assets/image/default-avatar-1.png')} />
  )
}
export const UserAvatarSquare = memo(UserAvatarSquareComponent, isEqual)
