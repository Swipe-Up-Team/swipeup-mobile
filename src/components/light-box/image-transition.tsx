import React, { createRef, forwardRef, memo, useImperativeHandle, useState } from 'react'
import { ImageSourcePropType, StyleSheet } from 'react-native'

import isEqual from 'react-fast-compare'
// import { Source } from 'react-native-fast-image'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { Measure } from '.'

import { GestureHOC } from './gesture-hoc'
import { styles } from './styles'

export interface ImageTransitionProps {
  image: Measure
  source: ImageSourcePropType | number
}

const ImageTransitionComponent = forwardRef((props, ref) => {
  // state
  const [image, setImage] = useState<ImageTransitionProps | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      show: (data: ImageTransitionProps) => {
        setImage(data)
      }
    }),
    []
  )

  // reanimated
  const backDropOpacity = useSharedValue(0)

  // reanimated style
  const backDropStyle = useAnimatedStyle(() => ({
    opacity: backDropOpacity.value
  }))

  // function
  const onClose = () => {
    setImage(null)
  }

  // render
  return image ? (
    <Animated.View style={[StyleSheet.absoluteFillObject]}>
      <Animated.View style={[styles.backdrop, backDropStyle]} />
      <GestureHOC {...image} backDropOpacity={backDropOpacity} onClose={onClose} />
    </Animated.View>
  ) : null
})
export interface IImageTransition {
  show: (data: ImageTransitionProps) => void
}
export const imageTransitionRef = createRef<IImageTransition>()

export const ImageTransition = memo(
  () => <ImageTransitionComponent ref={imageTransitionRef} />,
  isEqual
)
