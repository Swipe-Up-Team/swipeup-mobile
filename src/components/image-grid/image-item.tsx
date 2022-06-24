import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import styles from './styles'

interface ImageItemProps {
  image: MediaLibrary.Asset
}

export const ImageItem = ({ image }: ImageItemProps) => {
  const navigateToDetail = () => {
    navigate(APP_SCREEN.IMAGE_DETAIL, { imageUrl: image.uri })
  }

  return image ? (
    <TouchableOpacity activeOpacity={0.8} style={styles.image_view} onPress={navigateToDetail}>
      <Image
        onError={error => {
          console.log('error load image: ', error)
        }}
        style={styles.image}
        uri={image.uri}
      />
      {/* <LightBox source={{ uri: image }} style={styles.image} /> */}
    </TouchableOpacity>
  ) : (
    <View />
  )
}
