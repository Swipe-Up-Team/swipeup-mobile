import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Image } from 'react-native-expo-image-cache'
import * as MediaLibrary from 'expo-media-library'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'

interface ImageItemProps {
  image: MediaLibrary.Asset
  index: number
  onPress: (image: string, index: number, event: GestureResponderEvent) => void
}
export const ImageItem = ({ image, index, onPress }: ImageItemProps) => {
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
