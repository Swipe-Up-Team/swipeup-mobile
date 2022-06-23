import { useSelector } from '@src/common'
import * as MediaLibrary from 'expo-media-library'
import React, { memo, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { Animated, TouchableOpacity } from 'react-native'
import { VideoPlayer } from './video-player'

const PostVideoComponent = ({
  video,
  scrollToItem
}: {
  video: MediaLibrary.Asset
  scrollToItem?: (videoId: string) => void
}) => {
  let videoRef = useRef<typeof VideoPlayer>()
  const { threadWatchingController } = useSelector(x => x.video)

  const optionsLayout = new Animated.ValueXY({
    x: 0,
    y: 0
  })
  const _isShowOptions = false
  const threadHeightMap = []

  const onRefReadyHandler = ref => {
    videoRef = ref
  }

  useEffect(() => {
    return () => {
      threadHeightMap = []
    }
  }, [])

  const onPressToggleControllerHandler = () => {
    // if (videoRef._isShowController) {
    //   videoRef..hideController()
    // } else {
    //   if (!videoRef.isPaused) videoRef.showController()
    // }
  }

  const onFinishHandler = () => {
    const videoId = video.id
    if (scrollToItem) scrollToItem(videoId)
  }

  const shouldPlay =
    threadWatchingController.playingId === video.id && threadWatchingController.isPlaying

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPressToggleControllerHandler}>
      <VideoPlayer
        onFinish={onFinishHandler}
        isInThreadList={true}
        isAutoToggleController={true}
        onRefReady={onRefReadyHandler}
        shouldPlay={shouldPlay}
        source={{ uri: video.uri }}
        video={video}
        showController={false}
      />
    </TouchableOpacity>
  )
}

export const PostVideo = memo(PostVideoComponent, isEqual)
