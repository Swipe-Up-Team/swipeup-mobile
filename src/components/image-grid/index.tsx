import * as MediaLibrary from 'expo-media-library'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { GestureResponderEvent, StyleProp, View, ViewStyle } from 'react-native'
import { ImagesCarousel } from '../images-carousel'
import { ImageItem } from './image-item'
import styles from './styles'

export type ImageGridProps = {
  images: MediaLibrary.Asset[]
  style: StyleProp<ViewStyle>
  onPress: (image: string, index: number, event: GestureResponderEvent) => void
}

const ImageGridComponent = ({ images, style, onPress }: ImageGridProps) => {
  return images.length > 0 ? (
    <View style={[styles.container_row, style]}>
      {images.length === 1 ? (
        <ImageItem image={images[0]} onPress={onPress} index={0} />
      ) : (
        <ImagesCarousel images={images} />
      )}
    </View>
  ) : null
}
export const ImageGrid = memo(ImageGridComponent, isEqual)
