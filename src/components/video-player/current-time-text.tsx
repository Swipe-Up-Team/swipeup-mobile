import React, { useEffect, useState } from 'react'
import { dispatch, useSelector } from '@src/common'
import { setCurrentWatchingPosition } from '@src/store/reducers/video-reducer'
import { Text } from '@ui-kitten/components'
import { formatVideoDuration } from '@src/utils'

export default function CurrentTimeText(props: any) {
  const [timeString, setTimeString] = useState('00:00')
  const { videoId } = props
  const positions = useSelector(state => state.video.currentWatchTimePosition)

  useEffect(() => {
    const ids = positions.map(position => position.videoId)
    const index = ids.indexOf(videoId)

    if (index < 0) {
      dispatch(setCurrentWatchingPosition({ position: 0, videoId }))
      return setTimeString('00:00')
    }
    const curPosition = positions[index].position
    const maxSeconds = Math.round(curPosition / 1000)

    setTimeString(formatVideoDuration(maxSeconds))
  }, [positions, videoId])

  return <Text {...props}>{timeString}</Text>
}
