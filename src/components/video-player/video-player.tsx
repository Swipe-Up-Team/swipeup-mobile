/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */
import { View, Animated as RNAnimated, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'
import { AVPlaybackStatus, Video, VideoReadyForDisplayEvent } from 'expo-av'
import CurrentTimeText from './current-time-text'
import styles from './styles'
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State
} from 'react-native-gesture-handler'
import {
  setCurrentWatchingPosition,
  setThreadWatchingStatus
} from '@src/store/reducers/video-reducer'
import { dispatch } from '@src/common'
import isEqual from 'react-fast-compare'
import { PauseFillIcon, PlayFillIcon, SettingFillIcon } from '../icons'
import { Text } from '@ui-kitten/components'
import { useInterpolate } from '@src/common/animated'
import Animated, { Extrapolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { formatVideoDuration } from '@src/utils'

const VIDEO_PLAYER_WIDTH = SCREEN_WIDTH - 30
const maxTimeBarWidth = VIDEO_PLAYER_WIDTH - 40 - 100 - 20 - 7.5

const VideoPlayerComponent = (props: any) => {
  const {
    onRefReady,
    shouldPlay,
    source,
    containerStyle,
    isCenterVertical,
    video,

    isInThreadList,
    onShowController,
    onHideController,
    onPause,
    onPlay,
    onFinish,
    isAutoToggleController
  } = props
  console.log('🚀 ~ file: video-player.tsx ~ line 49 ~ VideoPlayerComponent ~ video', video)

  const [videoSize, setVideoSize] = useState({
    height: 230,
    width: SCREEN_WIDTH
  })
  const [maxTimeString, setMaxTimeString] = useState('')
  const [maxPositionMillis, setMaxPositionMillis] = useState(0)
  const [isPaused, setIsPaused] = useState(!shouldPlay)
  const [isShowController, setIsShowController] = useState(false)
  const [currentPositionMillis, setCurrentPositionMillis] = useState(0)
  const [didFinished, setDidFinished] = useState(false)
  const [isDraggingTimePoint, setIsDraggingTimePoint] = useState(false)
  const [startDraggingPosition, setStartDraggingPosition] = useState(0)

  if (typeof onRefReady === 'function') onRefReady()

  // timeout to hide controller
  let _sToHideController: NodeJS.Timeout

  // control zIndex controller
  const zIndexController = useSharedValue(-1)
  const opacityController = useInterpolate(zIndexController, [-1, 1], [0, 1], Extrapolate.CLAMP)

  // store btn play/pause opacity for style
  const playBtnOpacity = useSharedValue(0)
  const pauseBtnOpacity = useInterpolate(playBtnOpacity, [0, 1], [1, 0], Extrapolate.CLAMP)

  // store current video position for style
  const currentVideoPosition = useSharedValue(0)
  const offsetXTimePoint = useInterpolate(
    currentVideoPosition,
    [0, maxPositionMillis],
    [0, maxTimeBarWidth],
    Extrapolate.CLAMP
  )

  // vars for show/hide options
  let _isShowOptions = false
  let _optionRight = new RNAnimated.Value(-SCREEN_WIDTH)

  // reference to video component
  const videoRef = useRef<Video>()
  const handleVideoRef = (component: Video) => {
    if (!component) return
    videoRef.current = component
  }

  useEffect(() => {
    if (isPaused) {
      playBtnOpacity.value = 1
    } else {
      playBtnOpacity.value = 0
    }
  }, [isPaused])

  const onPressOptionIconHandler = () => {
    RNAnimated.timing(_optionRight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => (_isShowOptions = true))
  }

  const onPressBackdropOptionListHandler = () => {
    RNAnimated.timing(_optionRight, {
      toValue: -SCREEN_WIDTH,
      duration: 400,
      useNativeDriver: true
    }).start(() => (_isShowOptions = false))
  }

  const onReadyForDisplay = async ({ naturalSize, status }: VideoReadyForDisplayEvent) => {
    if (videoRef.current?.hasOwnProperty('_nativeRef') && !isPaused) {
      playBtnOpacity.value = 0
      await videoRef.current.replayAsync()
      setDidFinished(false)
    }

    const durationMillis = status?.durationMillis
    if (!durationMillis) return

    setMaxPositionMillis(durationMillis)

    const maxSeconds = Math.round(durationMillis / 1000)

    const _maxTimeString = formatVideoDuration(maxSeconds)
    setVideoSize(naturalSize)
    setMaxTimeString(_maxTimeString)
  }

  const onPressTogglePlayVideoHandler = async () => {
    if (isPaused) {
      if (isInThreadList)
        dispatch(setThreadWatchingStatus({ playingId: video.id, isPlaying: true }))

      await videoRef.current?.playAsync()

      setIsPaused(false)
      _sToHideController = setTimeout(() => {
        zIndexController.value = -1
        setIsShowController(false)
        if (typeof onHideController === 'function') onHideController()
      }, 3000)
      if (typeof onPlay === 'function') onPlay()
    } else {
      if (isInThreadList)
        dispatch(setThreadWatchingStatus({ playingId: video.id, isPlaying: false }))

      await videoRef.current?.pauseAsync()
      setIsPaused(true)
      clearTimeout(_sToHideController)
      if (typeof onPause === 'function') onPause()
    }
  }

  const onPlaybackStatusUpdateHandler = async (status: AVPlaybackStatus) => {
    if (currentPositionMillis >= maxPositionMillis && currentPositionMillis !== 0 && !didFinished) {
      setDidFinished(true)
      setIsPaused(true)

      await videoRef.current?.setPositionAsync(0, {
        toleranceMillisBefore: 0,
        toleranceMillisAfter: 0
      })

      if (typeof onFinish === 'function') onFinish()
    }

    const _currentPositionMillis = status.positionMillis

    if (!isDraggingTimePoint && _currentPositionMillis) {
      setCurrentPositionMillis(_currentPositionMillis)
      currentVideoPosition.value = _currentPositionMillis

      if (video.id)
        dispatch(
          setCurrentWatchingPosition({ position: _currentPositionMillis, videoId: video.id })
        )
    }
  }

  const onGestureEventHandler = ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { translationX } = nativeEvent
    let nextPositionMillis =
      startDraggingPosition + (translationX / maxTimeBarWidth) * maxPositionMillis
    nextPositionMillis =
      nextPositionMillis < 0
        ? 0
        : nextPositionMillis > maxPositionMillis
        ? maxPositionMillis
        : nextPositionMillis
    currentVideoPosition.value = nextPositionMillis
    if (video.id)
      dispatch(setCurrentWatchingPosition({ position: nextPositionMillis, videoId: video.id }))
  }

  const onHandlerStateChangeHandler = async ({
    nativeEvent
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const { state, translationX } = nativeEvent
    if (state === State.END) {
      let nextPositionMillis =
        startDraggingPosition + (translationX / maxTimeBarWidth) * maxPositionMillis
      nextPositionMillis =
        nextPositionMillis < 0
          ? 0
          : nextPositionMillis > maxPositionMillis
          ? maxPositionMillis
          : nextPositionMillis
      await videoRef.current?.setPositionAsync(nextPositionMillis, {
        toleranceMillisBefore: 0,
        toleranceMillisAfter: 0
      })
      setCurrentPositionMillis(nextPositionMillis)

      if (video.id)
        dispatch(setCurrentWatchingPosition({ position: nextPositionMillis, videoId: video.id }))
      setIsDraggingTimePoint(false)
    } else if (state === State.BEGAN) {
      setStartDraggingPosition(currentPositionMillis)
      setIsDraggingTimePoint(true)
    }
  }

  const onPressTimeBarHandler = async ({ nativeEvent }: GestureResponderEvent) => {
    const { locationX } = nativeEvent
    let nextPositionMillis = (locationX / maxTimeBarWidth) * maxPositionMillis
    nextPositionMillis =
      nextPositionMillis < 0
        ? 0
        : nextPositionMillis > maxPositionMillis
        ? maxPositionMillis
        : nextPositionMillis
    await videoRef.current?.setPositionAsync(nextPositionMillis, {
      toleranceMillisBefore: 0,
      toleranceMillisAfter: 0
    })
  }

  const onOptionsGestureEventHandler = ({
    nativeEvent
  }: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { translationX } = nativeEvent
    if (translationX < 0 || !_isShowOptions) return
    _optionRight.setValue(-translationX)
  }

  const onOptionsHandlerStateChangeHandler = ({
    nativeEvent
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const { translationX, state } = nativeEvent
    if (state === State.END) {
      if (translationX > SCREEN_WIDTH / 9) {
        _isShowOptions = false
        RNAnimated.timing(_optionRight, {
          toValue: -SCREEN_WIDTH,
          duration: 400,
          useNativeDriver: true
        }).start()
      } else {
        _isShowOptions = true
        RNAnimated.timing(_optionRight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start()
      }
    }
  }
  const onPressToggleControllerHandler = () => {
    if (isAutoToggleController) {
      if (isShowController) {
        zIndexController.value = -1
        setIsShowController(false)

        if (typeof onHideController === 'function') onHideController()
        if (isPaused) clearTimeout(_sToHideController)
      } else {
        zIndexController.value = 1
        setIsShowController(true)
        if (typeof onShowController === 'function') onShowController()

        if (!isPaused) {
          _sToHideController = setTimeout(() => {
            zIndexController.value = -1
            setIsShowController(false)
            if (typeof onHideController === 'function') onHideController()
          }, 3000)
        }
      }
    }
  }

  const fixedVideoHeight = useMemo(
    () =>
      videoSize.hasOwnProperty('height')
        ? (VIDEO_PLAYER_WIDTH / videoSize.width) * videoSize.height
        : 0,
    [videoSize]
  )

  const videoWrapperOffsetTop = useMemo(
    () => (isCenterVertical ? (SCREEN_HEIGHT - fixedVideoHeight) / 2 : 0),
    [isCenterVertical]
  )

  const playButtonStyle = useAnimatedStyle(() => ({ opacity: playBtnOpacity.value }))
  const pauseButtonStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: pauseBtnOpacity.value
  }))
  const postContentWrapperStyle = useAnimatedStyle(() => ({
    height: fixedVideoHeight,
    opacity: opacityController.value,
    zIndex: zIndexController.value
  }))
  const btnTimeControlStyle = useAnimatedStyle(() => ({
    left: offsetXTimePoint.value
  }))
  const playedBarStyle = useAnimatedStyle(() => ({
    width: offsetXTimePoint.value
  }))

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressToggleControllerHandler}
      style={{
        ...styles.postWrapper,
        ...containerStyle,
        top: videoWrapperOffsetTop,
        position: isCenterVertical ? 'absolute' : 'relative'
      }}
    >
      <View
        style={{
          ...styles.videoWrapper,
          width: VIDEO_PLAYER_WIDTH,
          height: fixedVideoHeight
        }}
      >
        <Video
          ref={handleVideoRef}
          progressUpdateIntervalMillis={500}
          onPlaybackStatusUpdate={onPlaybackStatusUpdateHandler}
          onReadyForDisplay={onReadyForDisplay}
          style={{
            ...styles.video,
            width: VIDEO_PLAYER_WIDTH,
            height: fixedVideoHeight
          }}
          source={source}
        />

        <Animated.View style={[styles.postContentWrapper, postContentWrapperStyle]}>
          <TouchableOpacity
            onPress={onPressToggleControllerHandler}
            style={{
              ...styles.videoToolWrapper,
              height: fixedVideoHeight / 2 + 35
            }}
          >
            <View style={styles.btnControlWrapper}>
              <TouchableOpacity
                style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center' }}
                onPress={onPressTogglePlayVideoHandler}
              >
                <Animated.View style={pauseButtonStyle}>
                  <PauseFillIcon />
                </Animated.View>
                <Animated.View style={playButtonStyle}>
                  <PlayFillIcon />
                </Animated.View>
              </TouchableOpacity>
            </View>

            <View style={styles.videoToolBar}>
              <View style={styles.timeBar}>
                <CurrentTimeText videoId={video.id} style={styles.currentTime} />
                <TouchableOpacity
                  onPress={onPressTimeBarHandler}
                  activeOpacity={1}
                  style={styles.timingBar}
                >
                  <TouchableOpacity activeOpacity={1}>
                    <PanGestureHandler
                      onHandlerStateChange={onHandlerStateChangeHandler}
                      onGestureEvent={onGestureEventHandler}
                    >
                      <Animated.View style={[styles.btnTimeControl, btnTimeControlStyle]} />
                    </PanGestureHandler>
                  </TouchableOpacity>
                  <Animated.View style={[styles.playedBar, playedBarStyle]} />
                </TouchableOpacity>
                <Text style={styles.maxTime}>{maxTimeString || '00:00'}</Text>
              </View>
              <TouchableOpacity onPress={onPressOptionIconHandler} style={styles.btnSetting}>
                <SettingFillIcon />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* <PanGestureHandler
        onHandlerStateChange={onOptionsHandlerStateChangeHandler}
        onGestureEvent={onOptionsGestureEventHandler}
      >
        <RNAnimated.View
          style={{
            ...styles.optionListWrapper,
            right: _optionRight,
            height: fixedVideoHeight < 250 ? fixedVideoHeight : 'auto'
          }}
        >
          <View style={styles.optionBackDrop}>
            <TouchableOpacity
              onPress={onPressBackdropOptionListHandler}
              style={{ width: '100%', height: '100%' }}
            >
              <View />
            </TouchableOpacity>
          </View>
          <View style={styles.allOptionWrapper}>
            <TouchableOpacity onPress={onPressBackdropOptionListHandler}>
              <View style={styles.optionItemWrapper}>
                <Text style={styles.optionText}>Auto</Text>
                <Text style={{ fontSize: 12, color: '#333' }}>Always choose best quality</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressBackdropOptionListHandler}>
              <View style={styles.optionItemWrapper}>
                <Text style={styles.optionText}>720p</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressBackdropOptionListHandler}>
              <View style={styles.optionItemWrapper}>
                <Text style={styles.optionText}>360p</Text>
              </View>
            </TouchableOpacity>
          </View>
        </RNAnimated.View>
      </PanGestureHandler> */}
    </TouchableOpacity>
  )
}

export const VideoPlayer = memo(VideoPlayerComponent, isEqual)
