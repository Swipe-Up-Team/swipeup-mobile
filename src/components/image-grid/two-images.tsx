import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { ImageItem } from './image-item'

interface TwoImagesProps {
  images: string[]
  onPress: (image: string, index: number, event: GestureResponderEvent) => void
}

export const TwoImages = (props: TwoImagesProps) => {
  return (
    <>
      <ImageItem image={props.images[0]} onPress={props.onPress} index={0} />
      <ImageItem image={props.images[1]} onPress={props.onPress} index={1} />
    </>
  )
}
