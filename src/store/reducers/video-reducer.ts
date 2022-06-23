import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from '@src/constants'

interface VideoPosition {
  position: number
  videoId: string
}
interface WatchingController {
  isPlaying: boolean
  playingId?: string
}

export interface VideoState {
  watchVideos: any[]
  seenWatchVideos: any[]
  watchVideoDetail: any
  currentWatchTimePosition: VideoPosition[]
  videosFromThread: any[]
  threadWatchingController: WatchingController
  threadHeightMap: any[]
}
const initialState: VideoState = {
  watchVideos: [],
  seenWatchVideos: [],
  watchVideoDetail: {},
  currentWatchTimePosition: [],
  videosFromThread: [],
  threadWatchingController: {
    isPlaying: false,
    playingId: undefined
  },
  threadHeightMap: []
}

const video = createSlice({
  name: SLICE_NAME.VIDEO,
  initialState: initialState,
  reducers: {
    setCurrentWatchingPosition: (state, { payload }: PayloadAction<VideoPosition>) => {
      const ids = state.currentWatchTimePosition.map(position => position.videoId)
      const index = ids.indexOf(payload.videoId)
      if (index > -1) {
        state.currentWatchTimePosition[index].position = payload.position
      } else {
        state.currentWatchTimePosition.push(payload)
      }
    },
    setThreadWatchingStatus: (state, { payload }: PayloadAction<WatchingController>) => {
      state.threadWatchingController = payload
    }
  }
})

const videoReducer = video.reducer

export default videoReducer

export const { setCurrentWatchingPosition, setThreadWatchingStatus } = video.actions
