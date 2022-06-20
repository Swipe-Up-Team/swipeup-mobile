import React, { memo, useCallback, useRef, useState } from 'react'
import {
  Image,
  ImageLoadEventData,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'

import isEqual from 'react-fast-compare'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { imageTransitionRef } from './image-transition'
import { styles } from './styles'

interface LightBoxProps {
  source: ImageSourcePropType | number
  style?: ImageStyle
}

export type Measure = {
  x: number
  y: number
  width: number
  height: number
  px: number
  py: number
  targetHeight: number
  targetWidth: number
  imageOpacity: Animated.SharedValue<number>
}

const LightBoxComponent = ({ source, style }: LightBoxProps) => {
  // state
  const refRoot = useRef<View>(null)
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [sizeImage, setSizeImage] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  })
  const { width: widthDevice } = useWindowDimensions()
  const imageOpacity = useSharedValue(1)

  // function
  const onImagePress = useCallback(() => {
    refRoot.current?.measure((x, y, width, height, px, py) => {
      const targetWidth = widthDevice
      const scaleFactor = widthDevice / sizeImage.width
      const targetHeight = sizeImage.height * scaleFactor
      imageTransitionRef.current?.show({
        image: {
          x,
          y,
          width,
          height,
          px,
          py,
          targetWidth,
          targetHeight,
          imageOpacity
        },
        source
      })
    })
  }, [widthDevice, imageOpacity, sizeImage, source])

  const onLoadedImage = useCallback((e: NativeSyntheticEvent<ImageLoadEventData>) => {
    setDisableButton(false)
    setSizeImage(e.nativeEvent.source)
  }, [])

  //reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    opacity: imageOpacity.value
  }))

  // render
  return (
    <>
      <View ref={refRoot} collapsable={false} style={[styles.container]}>
        <TouchableOpacity disabled={disableButton} onPress={onImagePress}>
          <Animated.View style={imageStyle}>
            <Image
              onLoad={onLoadedImage}
              style={[styles.img, style]}
              source={source}
              resizeMode={'cover'}
            />
            {/* <CachedImage
              onLoad={onLoadedImage}
              style={[styles.img, style]}
              source={source}
              resizeMode={'cover'}
            /> */}
            {/* <ExpoFastImage
              onLoad={onLoadedImage}
              style={[styles.img, style]}
              uri={source.uri}
              resizeMode={'cover'}
            /> */}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export const LightBox = memo(LightBoxComponent, isEqual)
