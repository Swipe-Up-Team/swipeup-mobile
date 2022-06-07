import React, { useRef } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State
} from 'react-native-gesture-handler'

import { goBack } from '@src/navigation/navigation-service'
import styles from './styles'

interface BottomSheetProps {
  title: React.ReactNode
  children: React.ReactNode
}

export const BottomSheet = ({ title, children }: BottomSheetProps) => {
  const bottomSheetOffsetY = React.useMemo(() => new Animated.Value(0), [])
  const ref = useRef<{
    bottomSheetHeight: number
  }>({
    bottomSheetHeight: 0
  })

  const onGestureEventHandler = ({
    nativeEvent: { translationY }
  }: PanGestureHandlerGestureEvent) => {
    if (translationY > 0) {
      bottomSheetOffsetY.setValue(translationY)
    }
  }
  const onStateChangeHandler = ({
    nativeEvent: { translationY, state }
  }: PanGestureHandlerGestureEvent) => {
    if (state === State.END) {
      if (translationY > ref.current.bottomSheetHeight * 0.6) {
        Animated.timing(bottomSheetOffsetY, {
          toValue: ref.current.bottomSheetHeight,
          useNativeDriver: true,
          duration: 150
        }).start(goBack)
      } else {
        Animated.spring(bottomSheetOffsetY, {
          toValue: 0,
          useNativeDriver: true
        }).start()
      }
    }
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={goBack} style={styles.goBackArea} />

      <PanGestureHandler
        onGestureEvent={onGestureEventHandler}
        onHandlerStateChange={onStateChangeHandler}
      >
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height }
            }
          }: LayoutChangeEvent) => {
            ref.current.bottomSheetHeight = height
          }}
          style={{
            ...styles.bottomSheet,
            transform: [
              {
                translateY: bottomSheetOffsetY
              }
            ]
          }}
        >
          <View style={styles.titleWrapper}>
            <View style={styles.movableLine} />
            <Text style={styles.titleText}>{title}</Text>
          </View>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  )
}
