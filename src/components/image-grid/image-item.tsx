import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Image } from 'react-native-expo-image-cache'

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
      <Image style={styles.image} uri={image} />
    </TouchableOpacity>
  ) : (
    <View />
  )
}
