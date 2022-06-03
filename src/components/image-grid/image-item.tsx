import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import { CachedImage } from '../cached-image'
import styles from './styles'

interface ImageItemProps {
  image: string
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
      <CachedImage
        style={styles.image}
        source={{
          uri: image
        }}
        cacheKey={image}
        // resizeMode="cover"
      />
    </TouchableOpacity>
  ) : (
    <View />
  )
}
