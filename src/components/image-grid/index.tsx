import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { ImagesCarousel } from '../images-carousel'
import { ImageItem } from './image-item'
import styles from './styles'

const renderImages = (
  start: number,
  overflow: boolean,
  images: string[],
  onPress: (image: string, index: number, event: GestureResponderEvent) => void
) => {
  return (
    <>
      <ImageItem image={images[start]} onPress={onPress} index={start} />
      {images[start + 1] && (
        <View style={styles.image_view}>
          <ImageItem image={images[start + 1]} onPress={onPress} index={start + 1} />
          {overflow && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={event => onPress(images[start + 1], start + 1, event)}
              style={styles.item_view_overlay}
            >
              <Text style={styles.text}>{`+${images.length - 3}`}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  )
}

export type ImageGridProps = {
  images: string[]
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
