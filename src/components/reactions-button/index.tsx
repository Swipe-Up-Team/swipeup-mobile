/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import {
  Animated,
  PanResponder,
  View,
  Pressable,
  GestureResponderEvent,
  PanResponderGestureState,
  Image
} from 'react-native'
import { reactionImages } from '@src/constants'
import styles from './styles'
import { Text } from '@ui-kitten/components'

export class ReactionsButton extends Component {
  timeDilation: number

  durationLongPress: number

  isTouchBtn: boolean

  isLongTouch: boolean

  isLiked: boolean

  whichIconUserChoose: number

  currentIconFocus: number

  previousIconFocus: number

  isDragging: boolean

  isDraggingOutside: boolean

  isJustDragInside: boolean

  durationAnimationBox: number

  durationAnimationQuickTouch: number

  durationAnimationLongTouch: number

  durationAnimationIconWhenDrag: number

  durationAnimationIconWhenRelease: number

  tiltIconAnim: Animated.Value

  zoomIconAnim: Animated.Value

  zoomTextAnim: Animated.Value

  tiltIconAnim2: Animated.Value

  zoomIconAnim2: Animated.Value

  zoomTextAnim2: Animated.Value

  fadeBoxAnim: Animated.Value

  moveRightGroupIcon: Animated.Value

  pushIconLikeUp: Animated.Value

  zoomIconLike: Animated.Value

  pushIconLoveUp: Animated.Value

  zoomIconLove: Animated.Value

  pushIconHahaUp: Animated.Value

  zoomIconHaha: Animated.Value

  pushIconWowUp: Animated.Value

  zoomIconWow: Animated.Value

  pushIconSadUp: Animated.Value

  zoomIconSad: Animated.Value

  pushIconAngryUp: Animated.Value

  zoomIconAngry: Animated.Value

  zoomIconChosen: Animated.Value

  zoomIconNotChosen: Animated.Value

  zoomIconWhenDragOutside: Animated.Value

  zoomIconWhenDragInside: Animated.Value

  zoomBoxWhenDragInside: Animated.Value

  zoomBoxWhenDragOutside: Animated.Value

  pushTextDescriptionUp: Animated.Value

  zoomTextDescription: Animated.Value

  zoomIconWhenRelease: Animated.Value

  moveUpDownIconWhenRelease: Animated.Value

  moveLeftIconLikeWhenRelease: Animated.Value

  moveLeftIconLoveWhenRelease: Animated.Value

  moveLeftIconHahaWhenRelease: Animated.Value

  moveLeftIconWowWhenRelease: Animated.Value

  moveLeftIconSadWhenRelease: Animated.Value

  moveLeftIconAngryWhenRelease: Animated.Value

  rootPanResponder: any

  timerMeasureLongTouch: NodeJS.Timeout | undefined

  constructor(props: any) {
    super(props)

    // Slow down speed animation here (1 = default)
    this.timeDilation = 1

    // If duration touch longer than it, mean long touch
    this.durationLongPress = 250

    // Variables to check
    // 0 = nothing, 1 = like, 2 = love, 3 = haha, 4 = wow, 5 = sad, 6 = angry
    this.isTouchBtn = false

    this.isLongTouch = false
    this.isLiked = false
    this.whichIconUserChoose = 0
    this.currentIconFocus = 0
    this.previousIconFocus = 0
    this.isDragging = false
    this.isDraggingOutside = false
    this.isJustDragInside = true

    // Duration animation
    this.durationAnimationBox = 500
    this.durationAnimationQuickTouch = 500
    this.durationAnimationLongTouch = 150
    this.durationAnimationIconWhenDrag = 150
    this.durationAnimationIconWhenRelease = 1000

    // ------------------------------------------------------------------------------
    // Animation button when quick touch button
    this.tiltIconAnim = new Animated.Value(0)
    this.zoomIconAnim = new Animated.Value(0)
    this.zoomTextAnim = new Animated.Value(0)

    // ------------------------------------------------------------------------------
    // Animation when button long touch button
    this.tiltIconAnim2 = new Animated.Value(0)
    this.zoomIconAnim2 = new Animated.Value(0)
    this.zoomTextAnim2 = new Animated.Value(0)
    // Animation of the box
    this.fadeBoxAnim = new Animated.Value(0)

    // Animation for emoticons
    this.moveRightGroupIcon = new Animated.Value(10)
    // Like
    this.pushIconLikeUp = new Animated.Value(0)
    // I don't know why, but when I set to 0.0, it seem blink,
    // so temp solution is set to 0.01
    this.zoomIconLike = new Animated.Value(0.01)
    // Love
    this.pushIconLoveUp = new Animated.Value(0)
    this.zoomIconLove = new Animated.Value(0.01)
    // Haha
    this.pushIconHahaUp = new Animated.Value(0)
    this.zoomIconHaha = new Animated.Value(0.01)
    // Wow
    this.pushIconWowUp = new Animated.Value(0)
    this.zoomIconWow = new Animated.Value(0.01)
    // Sad
    this.pushIconSadUp = new Animated.Value(0)
    this.zoomIconSad = new Animated.Value(0.01)
    // Angry
    this.pushIconAngryUp = new Animated.Value(0)
    this.zoomIconAngry = new Animated.Value(0.01)

    // ------------------------------------------------------------------------------
    // Animation for zoom emoticons when drag
    this.zoomIconChosen = new Animated.Value(1)
    this.zoomIconNotChosen = new Animated.Value(1)
    this.zoomIconWhenDragOutside = new Animated.Value(1)
    this.zoomIconWhenDragInside = new Animated.Value(1)
    this.zoomBoxWhenDragInside = new Animated.Value(1)
    this.zoomBoxWhenDragOutside = new Animated.Value(0.95)

    // Animation for text description at top icon
    this.pushTextDescriptionUp = new Animated.Value(60)
    this.zoomTextDescription = new Animated.Value(1)

    // ------------------------------------------------------------------------------
    // Animation for jump emoticon when release finger
    this.zoomIconWhenRelease = new Animated.Value(1)
    this.moveUpDownIconWhenRelease = new Animated.Value(0)
    this.moveLeftIconLikeWhenRelease = new Animated.Value(20)
    this.moveLeftIconLoveWhenRelease = new Animated.Value(72)
    this.moveLeftIconHahaWhenRelease = new Animated.Value(124)
    this.moveLeftIconWowWhenRelease = new Animated.Value(173)
    this.moveLeftIconSadWhenRelease = new Animated.Value(226)
    this.moveLeftIconAngryWhenRelease = new Animated.Value(278)
  }

  UNSAFE_componentWillMount() {
    this.setupPanResponder()
  }

  // Handle the drag gesture
  setupPanResponder() {
    this.rootPanResponder = PanResponder.create({
      // prevent if user's dragging without long touch the button
      onMoveShouldSetPanResponder: () => !this.isTouchBtn && this.isLongTouch,

      onPanResponderGrant: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        this.handleEmoticonWhenDragging(e, gestureState)
      },

      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        this.handleEmoticonWhenDragging(e, gestureState)
      },

      onPanResponderRelease: () => {
        this.isDragging = false
        this.isDraggingOutside = false
        this.isJustDragInside = true
        this.previousIconFocus = 0
        this.currentIconFocus = 0
        this.setState({})

        this.onDragRelease()
      }
    })
  }

  handleEmoticonWhenDragging = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    // height of toolbar and the status bar is around 50
    // so the range we check is about 50 -> 600 (approx. height of a post)
    if (gestureState.y0 + gestureState.dy >= 50 && gestureState.y0 + gestureState.dy <= 600) {
      this.isDragging = true
      this.isDraggingOutside = false

      if (this.isJustDragInside) {
        this.controlIconWhenDragInside()
      }

      if (gestureState.x0 + gestureState.dx >= 35 && gestureState.x0 + gestureState.dx < 88.33) {
        if (this.currentIconFocus !== 1) {
          this.handleWhenDragBetweenIcon(1)
        }
      } else if (
        gestureState.x0 + gestureState.dx >= 88.33 &&
        gestureState.x0 + gestureState.dx < 141.66
      ) {
        if (this.currentIconFocus !== 2) {
          this.handleWhenDragBetweenIcon(2)
        }
      } else if (
        gestureState.x0 + gestureState.dx >= 141.66 &&
        gestureState.x0 + gestureState.dx < 194.99
      ) {
        if (this.currentIconFocus !== 3) {
          this.handleWhenDragBetweenIcon(3)
        }
      } else if (
        gestureState.x0 + gestureState.dx >= 194.99 &&
        gestureState.x0 + gestureState.dx < 248.32
      ) {
        if (this.currentIconFocus !== 4) {
          this.handleWhenDragBetweenIcon(4)
        }
      } else if (
        gestureState.x0 + gestureState.dx >= 248.32 &&
        gestureState.x0 + gestureState.dx < 301.65
      ) {
        if (this.currentIconFocus !== 5) {
          this.handleWhenDragBetweenIcon(5)
        }
      } else if (
        gestureState.x0 + gestureState.dx >= 301.65 &&
        gestureState.x0 + gestureState.dx <= 354.98
      ) {
        if (this.currentIconFocus !== 6) {
          this.handleWhenDragBetweenIcon(6)
        }
      }
    } else {
      this.whichIconUserChoose = 0
      this.previousIconFocus = 0
      this.currentIconFocus = 0
      this.isJustDragInside = true

      if (this.isDragging && !this.isDraggingOutside) {
        this.isDragging = false
        this.isDraggingOutside = true
        this.setState({})

        this.controlBoxWhenDragOutside()
        this.controlIconWhenDragOutside()
      }
    }
  }

  // Handle the touch of button
  onTouchStart = () => {
    this.isTouchBtn = true
    this.setState({})

    this.timerMeasureLongTouch = setTimeout(this.doAnimationLongTouch, this.durationLongPress)
  }

  onTouchEnd = () => {
    this.isTouchBtn = false
    this.setState({})

    if (!this.isLongTouch) {
      if (this.whichIconUserChoose !== 0) {
        this.whichIconUserChoose = 0

        // assuming that another emoticon is the same like, so we can animate the reverse then
        this.isLiked = true
      }
      clearTimeout(this.timerMeasureLongTouch as NodeJS.Timeout)
      this.doAnimationQuickTouch()
    }
  }

  onDragRelease = () => {
    // To lower the emoticons
    this.doAnimationLongTouchReverse()

    // To jump particular emoticon be chosen
    this.controlIconWhenRelease()
    console.log(this.whichIconUserChoose)
  }

  // ------------------------------------------------------------------------------
  // Animation button when quick touch button
  doAnimationQuickTouch = () => {
    if (!this.isLiked) {
      this.isLiked = true
      console.log(this.whichIconUserChoose)
      this.setState({})

      this.tiltIconAnim.setValue(0)
      this.zoomIconAnim.setValue(0)
      this.zoomTextAnim.setValue(0)
      Animated.parallel([
        Animated.timing(this.tiltIconAnim, {
          toValue: 1,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        }),
        Animated.timing(this.zoomIconAnim, {
          toValue: 1,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        }),
        Animated.timing(this.zoomTextAnim, {
          toValue: 1,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        })
      ]).start()
    } else {
      this.isLiked = false
      this.setState({})

      this.tiltIconAnim.setValue(1)
      this.zoomIconAnim.setValue(1)
      this.zoomTextAnim.setValue(1)
      Animated.parallel([
        Animated.timing(this.tiltIconAnim, {
          toValue: 0,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        }),
        Animated.timing(this.zoomIconAnim, {
          toValue: 0,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        }),
        Animated.timing(this.zoomTextAnim, {
          toValue: 0,
          duration: this.durationAnimationQuickTouch * this.timeDilation,
          useNativeDriver: false
        })
      ]).start()
    }
  }

  // ------------------------------------------------------------------------------
  // Animation when long touch button
  doAnimationLongTouch = () => {
    this.isLongTouch = true
    // TODO: add this
    // this.props.store.toggleReactionsLongPressed()
    this.setState({})

    this.tiltIconAnim2.setValue(0)
    this.zoomIconAnim2.setValue(1)
    this.zoomTextAnim2.setValue(1)

    this.fadeBoxAnim.setValue(0)

    this.moveRightGroupIcon.setValue(10)

    this.pushIconLikeUp.setValue(0)
    this.zoomIconLike.setValue(0.01)

    this.pushIconLoveUp.setValue(0)
    this.zoomIconLove.setValue(0.01)

    this.pushIconHahaUp.setValue(0)
    this.zoomIconHaha.setValue(0.01)

    this.pushIconWowUp.setValue(0)
    this.zoomIconWow.setValue(0.01)

    this.pushIconSadUp.setValue(0)
    this.zoomIconSad.setValue(0.01)

    this.pushIconAngryUp.setValue(0)
    this.zoomIconAngry.setValue(0.01)

    Animated.parallel([
      // Button
      Animated.timing(this.tiltIconAnim2, {
        toValue: 1,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconAnim2, {
        toValue: 0.8,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomTextAnim2, {
        toValue: 0.8,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),

      // Box
      Animated.timing(this.fadeBoxAnim, {
        toValue: 1,
        duration: this.durationAnimationBox * this.timeDilation,
        delay: 350,
        useNativeDriver: false
      }),

      // Group emoticon
      Animated.timing(this.moveRightGroupIcon, {
        toValue: 20,
        duration: this.durationAnimationBox * this.timeDilation,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconLikeUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconLike, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconLoveUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        delay: 50,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconLove, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        delay: 50,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconHahaUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        delay: 100,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconHaha, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        delay: 100,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconWowUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        delay: 150,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconWow, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        delay: 150,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconSadUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        delay: 200,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconSad, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        delay: 200,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconAngryUp, {
        toValue: 25,
        duration: 250 * this.timeDilation,
        delay: 250,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconAngry, {
        toValue: 1,
        duration: 250 * this.timeDilation,
        delay: 250,
        useNativeDriver: false
      })
    ]).start()
  }

  doAnimationLongTouchReverse = () => {
    this.tiltIconAnim2.setValue(1)
    this.zoomIconAnim2.setValue(0.8)
    this.zoomTextAnim2.setValue(0.8)

    this.fadeBoxAnim.setValue(1)

    this.moveRightGroupIcon.setValue(20)

    this.pushIconLikeUp.setValue(25)
    this.zoomIconLike.setValue(1)

    this.pushIconLoveUp.setValue(25)
    this.zoomIconLove.setValue(1)

    this.pushIconHahaUp.setValue(25)
    this.zoomIconHaha.setValue(1)

    this.pushIconWowUp.setValue(25)
    this.zoomIconWow.setValue(1)

    this.pushIconSadUp.setValue(25)
    this.zoomIconSad.setValue(1)

    this.pushIconAngryUp.setValue(25)
    this.zoomIconAngry.setValue(1)

    Animated.parallel([
      // Button
      Animated.timing(this.tiltIconAnim2, {
        toValue: 0,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconAnim2, {
        toValue: 1,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomTextAnim2, {
        toValue: 1,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),

      // Box
      Animated.timing(this.fadeBoxAnim, {
        toValue: 0,
        duration: this.durationAnimationLongTouch * this.timeDilation,
        useNativeDriver: false
      }),

      // Group emoticon
      Animated.timing(this.moveRightGroupIcon, {
        toValue: 10,
        duration: this.durationAnimationBox * this.timeDilation,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconLikeUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconLike, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconLoveUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        delay: 50,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconLove, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        delay: 50,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconHahaUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        delay: 100,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconHaha, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        delay: 100,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconWowUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        delay: 150,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconWow, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        delay: 150,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconSadUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        delay: 200,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconSad, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        delay: 200,
        useNativeDriver: false
      }),

      Animated.timing(this.pushIconAngryUp, {
        toValue: 0,
        duration: 250 * this.timeDilation,
        delay: 250,
        useNativeDriver: false
      }),
      Animated.timing(this.zoomIconAngry, {
        toValue: 0.01,
        duration: 250 * this.timeDilation,
        delay: 250,
        useNativeDriver: false
      })
    ]).start(this.onAnimationLongTouchComplete)
  }

  onAnimationLongTouchComplete = () => {
    this.isLongTouch = false

    // TODO: add this
    // this.props.store.toggleReactionsLongPressed()
    this.setState({})
  }

  // ------------------------------------------------------------------------------
  // Animation for zoom emoticons when drag
  handleWhenDragBetweenIcon = currentIcon => {
    this.whichIconUserChoose = currentIcon
    this.previousIconFocus = this.currentIconFocus
    this.currentIconFocus = currentIcon

    this.controlIconWhenDrag()
  }

  controlIconWhenDrag = () => {
    this.zoomIconChosen.setValue(0.8)
    this.zoomIconNotChosen.setValue(1.8)
    this.zoomBoxWhenDragInside.setValue(1.0)

    this.pushTextDescriptionUp.setValue(60)
    this.zoomTextDescription.setValue(1.0)

    // For update logic at render function
    this.setState({})

    // Need timeout so logic check at render function can update
    setTimeout(
      () =>
        Animated.parallel([
          Animated.timing(this.zoomIconChosen, {
            toValue: 1.8,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
          }),
          Animated.timing(this.zoomIconNotChosen, {
            toValue: 0.8,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
          }),
          Animated.timing(this.zoomBoxWhenDragInside, {
            toValue: 0.95,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
          }),

          Animated.timing(this.pushTextDescriptionUp, {
            toValue: 90,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
          }),
          Animated.timing(this.zoomTextDescription, {
            toValue: 1.7,
            duration: this.durationAnimationIconWhenDrag * this.timeDilation,
            useNativeDriver: false
          })
        ]).start(),
      50
    )
  }

  controlIconWhenDragInside = () => {
    this.setState({})

    this.zoomIconWhenDragInside.setValue(1.0)
    Animated.timing(this.zoomIconWhenDragInside, {
      toValue: 0.8,
      duration: this.durationAnimationIconWhenDrag * this.timeDilation,
      useNativeDriver: false
    }).start(this.onAnimationIconWhenDragInsideComplete)
  }

  onAnimationIconWhenDragInsideComplete = () => {
    this.isJustDragInside = false
    this.setState({})
  }

  controlIconWhenDragOutside = () => {
    this.zoomIconWhenDragOutside.setValue(0.8)

    Animated.timing(this.zoomIconWhenDragOutside, {
      toValue: 1.0,
      duration: this.durationAnimationIconWhenDrag * this.timeDilation,
      useNativeDriver: false
    }).start()
  }

  controlBoxWhenDragOutside = () => {
    this.zoomBoxWhenDragOutside.setValue(0.95)

    Animated.timing(this.zoomBoxWhenDragOutside, {
      toValue: 1.0,
      duration: this.durationAnimationIconWhenDrag * this.timeDilation,
      useNativeDriver: false
    }).start()
  }

  // ------------------------------------------------------------------------------
  // Animation for jump emoticon when release finger0.01
  controlIconWhenRelease = () => {
    this.zoomIconWhenRelease.setValue(1)
    this.moveUpDownIconWhenRelease.setValue(0)
    this.moveLeftIconLikeWhenRelease.setValue(20)
    this.moveLeftIconLoveWhenRelease.setValue(72)
    this.moveLeftIconHahaWhenRelease.setValue(154)
    this.moveLeftIconWowWhenRelease.setValue(173)
    this.moveLeftIconSadWhenRelease.setValue(226)
    this.moveLeftIconAngryWhenRelease.setValue(278)

    Animated.parallel([
      Animated.timing(this.zoomIconWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveUpDownIconWhenRelease, {
        toValue: 1,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconLikeWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconLoveWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconHahaWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconWowWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconSadWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      }),
      Animated.timing(this.moveLeftIconAngryWhenRelease, {
        toValue: 0,
        duration: this.durationAnimationIconWhenRelease * this.timeDilation,
        useNativeDriver: false
      })
    ]).start()
  }

  render() {
    return (
      <View {...this.rootPanResponder.panHandlers}>
        {/* Box */}
        <Animated.View
          style={[
            styles.viewBox,
            {
              opacity: this.fadeBoxAnim,
              transform: [
                {
                  scale: this.isDragging
                    ? this.previousIconFocus === 0
                      ? this.zoomBoxWhenDragInside
                      : 0.95
                    : this.isDraggingOutside
                    ? this.zoomBoxWhenDragOutside
                    : 1.0
                }
              ]
            }
          ]}
        />

        {/* Group emoticon */}
        {this.renderGroupIcon()}

        {/*Group emoticon for jump*/}
        {this.renderGroupJumpIcon()}

        {/* Button */}
        {this.renderButton()}
      </View>
    )
  }

  renderButton() {
    let tiltBounceIconAnim = this.tiltIconAnim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: ['0deg', '20deg', '-15deg', '0deg']
    })
    let zoomBounceIconAnim = this.zoomIconAnim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [1, 0.8, 1.15, 1]
    })
    let zoomBounceTextAnim = this.zoomIconAnim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [1, 0.8, 1.15, 1]
    })

    let tiltBounceIconAnim2 = this.tiltIconAnim2.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '20deg']
    })

    return (
      <Pressable style={styles.viewBtn} onPressIn={this.onTouchStart} onPressOut={this.onTouchEnd}>
        <Animated.Image
          source={this.getIconBtn()}
          style={[
            styles.imgLikeInBtn,
            {
              transform: [
                {
                  rotate: this.isLongTouch ? tiltBounceIconAnim2 : tiltBounceIconAnim
                },
                {
                  scale: this.isLongTouch ? this.zoomIconAnim2 : zoomBounceIconAnim
                }
              ]
            }
          ]}
        />
        <Animated.Text
          style={[
            styles.textBtn,
            { color: this.getColorTextBtn() },
            {
              transform: [
                {
                  scale: this.isLongTouch ? this.zoomTextAnim2 : zoomBounceTextAnim
                }
              ]
            }
          ]}
        >
          {this.getTextBtn()}
        </Animated.Text>
      </Pressable>
    )
  }

  getBorderColorBtn() {
    if (!this.isLongTouch && this.isLiked) {
      return '#3b5998'
    } else if (!this.isDragging) {
      switch (this.whichIconUserChoose) {
        case 1:
          return '#3b5998'
        case 2:
          return '#ED5167'
        case 3:
        case 4:
        case 5:
          return '#FFD96A'
        case 6:
          return '#F6876B'
        default:
          return 'grey'
      }
    } else {
      return 'grey'
    }
  }

  getColorTextBtn() {
    if (!this.isLongTouch && this.isLiked) {
      return '#3b5998'
    } else if (!this.isDragging) {
      switch (this.whichIconUserChoose) {
        case 1:
          return '#3b5998'
        case 2:
          return '#ED5167'
        case 3:
        case 4:
        case 5:
          return '#FFD96A'
        case 6:
          return '#F6876B'
        default:
          return 'grey'
      }
    } else {
      return 'grey'
    }
  }

  getIconBtn() {
    if (!this.isLongTouch && this.isLiked) {
      return reactionImages.like_static_fill
    } else if (!this.isDragging) {
      switch (this.whichIconUserChoose) {
        case 1:
          return reactionImages.like_static_fill
        case 2:
          return reactionImages.love_static
        case 3:
          return reactionImages.haha_static
        case 4:
          return reactionImages.wow_static
        case 5:
          return reactionImages.sad_static
        case 6:
          return reactionImages.angry_static
        default:
          return reactionImages.like_static
      }
    } else {
      return reactionImages.like_static
    }
  }

  getTextBtn() {
    if (this.isDragging) {
      return 'Like'
    }
    switch (this.whichIconUserChoose) {
      case 1:
        return 'Like'
      case 2:
        return 'Love'
      case 3:
        return 'Haha'
      case 4:
        return 'Wow'
      case 5:
        return 'Sad'
      case 6:
        return 'Angry'
      default:
        return 'Like'
    }
  }

  renderGroupIcon() {
    return (
      <Animated.View style={[styles.viewWrapGroupIcon, { top: this.isLongTouch ? -120 : 120 }]}>
        {/* Icon like */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 1 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Like</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconLikeUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 1
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 1
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconLike
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/like.gif'
              }}
            />
          </Animated.View>
        </View>

        {/* Icon love */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 2 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Love</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconLoveUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 2
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 2
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconLove
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/love.gif'
              }}
            />
          </Animated.View>
        </View>

        {/* Icon haha */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 3 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Haha</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconHahaUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 3
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 3
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconHaha
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/haha.gif'
              }}
            />
          </Animated.View>
        </View>

        {/* Icon wow */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 4 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Wow</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconWowUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 4
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 4
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconWow
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/wow.gif'
              }}
            />
          </Animated.View>
        </View>

        {/* Icon sad */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 5 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Sad</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconSadUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 5
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 5
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconSad
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/sad.gif'
              }}
            />
          </Animated.View>
        </View>

        {/* Icon angry */}
        <View style={styles.viewWrapIcon}>
          {this.currentIconFocus === 6 ? (
            <Animated.View
              style={[
                styles.viewWrapTextDescription,
                {
                  bottom: this.pushTextDescriptionUp,
                  transform: [{ scale: this.zoomTextDescription }]
                }
              ]}
            >
              <Text style={styles.textDescription}>Angry</Text>
            </Animated.View>
          ) : null}
          <Animated.View
            style={{
              marginBottom: this.pushIconAngryUp,
              transform: [
                {
                  scale: this.isDragging
                    ? this.currentIconFocus === 6
                      ? this.zoomIconChosen
                      : this.previousIconFocus === 6
                      ? this.zoomIconNotChosen
                      : this.isJustDragInside
                      ? this.zoomIconWhenDragInside
                      : 0.8
                    : this.isDraggingOutside
                    ? this.zoomIconWhenDragOutside
                    : this.zoomIconAngry
                }
              ]
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/angry.gif'
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
    )
  }

  renderGroupJumpIcon() {
    let moveUpDownIcon = this.moveUpDownIconWhenRelease.interpolate({
      inputRange: [0, 0.2, 0.5, 1],
      outputRange: [40, 100, 0, -250]
    })

    return (
      <View style={[styles.viewWrapGroupJumpIcon, { top: this.isLongTouch ? -170 : 0 }]}>
        {/*Icon like*/}
        {this.whichIconUserChoose === 1 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconLikeWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/like.gif'
              }}
            />
          </Animated.View>
        ) : null}

        {/*Icon love*/}
        {this.whichIconUserChoose === 2 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconLoveWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/love.gif'
              }}
            />
          </Animated.View>
        ) : null}

        {/*Icon haha*/}
        {this.whichIconUserChoose === 3 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconHahaWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/haha.gif'
              }}
            />
          </Animated.View>
        ) : null}

        {/*Icon wow*/}
        {this.whichIconUserChoose === 4 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconWowWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/wow.gif'
              }}
            />
          </Animated.View>
        ) : null}

        {/*Icon sad*/}
        {this.whichIconUserChoose === 5 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconSadWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/sad.gif'
              }}
            />
          </Animated.View>
        ) : null}

        {/*Icon angry*/}
        {this.whichIconUserChoose === 6 && !this.isDragging ? (
          <Animated.View
            style={{
              width: 40,
              height: 40,
              left: this.moveLeftIconAngryWhenRelease,
              bottom: moveUpDownIcon,
              transform: [{ scale: this.zoomIconWhenRelease }],
              position: 'absolute'
            }}
          >
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/Images/angry.gif'
              }}
            />
          </Animated.View>
        ) : null}
      </View>
    )
  }
}
