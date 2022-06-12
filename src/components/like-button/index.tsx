import AnimatedLottieView from 'lottie-react-native'
import React, { memo, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  heartLottie: {
    width: 40
  }
})

interface LikeButtonComponentProps {
  isLiked: boolean
}
const LikeButtonComponent = ({ isLiked }: LikeButtonComponentProps) => {
  const animation = useRef<AnimatedLottieView>(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (!animation.current) return

    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(123, 123)
      } else {
        animation.current.play(52, 52)
      }
      isFirstRun.current = false
    } else if (isLiked) {
      animation.current.play(52, 123)
    } else {
      animation.current.play(0, 52)
    }
  }, [isLiked])

  return (
    <AnimatedLottieView
      resizeMode="center"
      ref={animation}
      style={styles.heartLottie}
      source={require('@assets/lottie/like-130.json')}
      autoPlay={false}
      loop={false}
    />
  )
}
export const LikeButton = memo(LikeButtonComponent, isEqual)
