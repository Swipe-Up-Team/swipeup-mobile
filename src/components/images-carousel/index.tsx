import React, { useRef, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Carousel, { AdditionalParallaxProps, Pagination } from 'react-native-snap-carousel'

import styles from './styles'

const { width: screenWidth } = Dimensions.get('window')

export const ImagesCarousel = ({ images }: { images: string[] }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef<Carousel<string>>(null)

  const renderItem = (
    { item }: { item: string; index: number },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          // source={{ uri: item }}
          uri={item}
          // containerStyle={styles.imageContainer}
          style={styles.image}
          // parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 30}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  )
}
