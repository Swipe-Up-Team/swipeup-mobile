import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Image } from 'react-native-expo-image-cache'
import * as MediaLibrary from 'expo-media-library'

interface ImageItemProps {
  image: MediaLibrary.Asset
  index: number
  onPress: (image: string, index: number, event: GestureResponderEvent) => void
}
export const ImageItem = ({ image, index, onPress }: ImageItemProps) => {
  return image ? (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.image_view}
      onPress={event => onPress(image, index, event)}
    >
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
