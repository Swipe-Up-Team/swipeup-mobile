import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as MediaLibrary from 'expo-media-library'
import { SLICE_NAME } from '../../constants/enums'

export interface SystemAssetsState {
  systemAssets: MediaLibrary.Asset[]
  selectedAssets: MediaLibrary.Asset[]
}

const initialState: SystemAssetsState = {
  systemAssets: [],
  selectedAssets: []
}
const systemAssets = createSlice({
  name: SLICE_NAME.SYSTEM_ASSETS,
  initialState: initialState,
  reducers: {
    onSetSystemAsset: (state, { payload }: PayloadAction<MediaLibrary.Asset[]>) => {
      state.systemAssets = payload
    },
    onSetSelectedAssetIndexes: (state, { payload }: PayloadAction<number[]>) => {
      const selectedAssets: MediaLibrary.Asset[] = []
      payload.forEach(idx => selectedAssets.push(state.systemAssets[idx]))

      state.selectedAssets = selectedAssets
    }
  }
})

const systemAssetsReducer = systemAssets.reducer
export default systemAssetsReducer
export const { onSetSystemAsset, onSetSelectedAssetIndexes } = systemAssets.actions
