import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '@src/constants'
import React from 'react'
import { Animated, Image, ImageBackground, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Post } from '@src/models'
import { PopupImageLocation } from '../profile'
import ExpoFastImage from 'expo-fast-image'

interface Prop {
  selectedPhoto: Post
  refProps: React.MutableRefObject<{
    currentTab: number
    currentGalleryTab: number
    headerHeight: number
    showHeaderTab: boolean
    prePopupImage: {
      pX: number
      pY: number
      w: number
      h: number
    }
  }>
  popupImageLocation: PopupImageLocation
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: STATUS_BAR_HEIGHT,
    zIndex: 99
  },
  imageBackground: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  screen_full: {
    width: '100%',
    height: '100%'
  }
})

export default function PopupImage({ selectedPhoto, refProps, popupImageLocation }: Prop) {
  const { popupImageTop, popupImageLeft, popupImageWidth, popupImageHeight } = popupImageLocation

  const onAnimatePopup = ({ nativeEvent }: LayoutChangeEvent) => {
    if (selectedPhoto?.content.images) {
      Image.getSize(
        selectedPhoto?.content.images[0],
        (xwidth: number, xheight: number) => {
          const nextHeight = (xheight * 0.9 * SCREEN_WIDTH) / xwidth
          popupImageTop.setValue(refProps.current.prePopupImage.pY - 44)
          popupImageLeft.setValue(refProps.current.prePopupImage.pX)
          popupImageWidth.setValue(refProps.current.prePopupImage.w)
          popupImageHeight.setValue(refProps.current.prePopupImage.h)
          Animated.spring(popupImageTop, {
            toValue: (nativeEvent.layout.height - nextHeight) / 2,
            useNativeDriver: false
          }).start()
          Animated.spring(popupImageLeft, {
            toValue: (nativeEvent.layout.width - 0.9 * SCREEN_WIDTH) / 2,
            useNativeDriver: false
          }).start()
          Animated.spring(popupImageWidth, {
            toValue: 0.9 * SCREEN_WIDTH,
            useNativeDriver: false
          }).start()
          Animated.spring(popupImageHeight, {
            toValue: nextHeight,
            useNativeDriver: false
          }).start()
        },
        Function
      )
    }
  }

  return !selectedPhoto?.content?.images ? null : (
    <View style={styles.container}>
      <ImageBackground
        onLayout={onAnimatePopup}
        blurRadius={20}
        style={styles.imageBackground}
        source={{ uri: selectedPhoto.content.images[0], cache: 'force-cache' }}
      >
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: popupImageWidth,
            position: 'absolute',
            top: popupImageTop,
            left: popupImageLeft,
            borderRadius: 20,
            overflow: 'hidden'
          }}
        >
          <Animated.View
            style={{
              height: popupImageHeight,
              width: popupImageWidth
            }}
          >
            <ExpoFastImage
              style={styles.screen_full}
              source={{
                uri: selectedPhoto.content.images[0]
              }}
            />
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </View>
  )
}
