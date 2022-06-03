import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ImagesCarousel } from '../images-carousel'
import { ImageItem } from './image-item'
import styles from './styles'
import { TwoImages } from './two-images'

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

export const ImageGrid = ({ images, style, onPress }: ImageGridProps) => {
  return images.length > 0 ? (
    <View style={[styles.container_row, style]}>
      {/* {images.length <= 2 ? (
        <TwoImages images={images} onPress={onPress} />
      ) : (
        <ImageItem image={images[0]} onPress={onPress} index={0} />
      )}
      {images.length === 3 && (
        <View style={styles.container}>{renderImages(1, false, images, onPress)}</View>
      )}
      {images.length > 3 && (
        <View style={styles.container}>{renderImages(1, true, images, onPress)}</View>
      )} */}
      {images.length === 1 ? (
        <ImageItem image={images[0]} onPress={onPress} index={0} />
      ) : (
        <ImagesCarousel />
      )}
    </View>
  ) : null
}
