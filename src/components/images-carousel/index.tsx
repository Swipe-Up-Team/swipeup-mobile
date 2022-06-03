import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel, {
  AdditionalParallaxProps,
  Pagination,
  ParallaxImage
} from 'react-native-snap-carousel'
import styles from './styles'

const { width: screenWidth } = Dimensions.get('window')

const ENTRIES1 = [
  'https://i.imgur.com/UYiroysl.jpg',
  'https://i.imgur.com/UPrs1EWl.jpg',
  'https://i.imgur.com/MABUbpDl.jpg',
  'https://i.imgur.com/KZsmUi2l.jpg',
  'https://i.imgur.com/2nCt3Sbl.jpg'
]

export const ImagesCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [entries, setEntries] = useState<string[]>([])
  const carouselRef = useRef<Carousel<string>>(null)

  useEffect(() => {
    setEntries(ENTRIES1)
  }, [])

  const renderItem = (
    { item }: { item: string; index: number },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
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
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={entries.length}
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
