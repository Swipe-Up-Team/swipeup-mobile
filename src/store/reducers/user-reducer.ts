import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '@src/config'
import { SLICE_NAME } from '@src/constants/enums'
import { User } from '@src/models'
import { doc, getDoc } from 'firebase/firestore'
import * as MediaLibrary from 'expo-media-library'
import { storageService, userService } from '@src/services'
import { STORAGE_ENDPOINT } from '@src/constants'
export interface UserState {
  user?: User
  followingUsers?: User[]
}

const initialState: UserState = {
  user: undefined,
  followingUsers: undefined
}

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (image: MediaLibrary.Asset) => {
    const uploadedImage = await storageService.uploadSingleFile(image, STORAGE_ENDPOINT.FILES, {})
    await userService.updateAvatar(uploadedImage.uri)
    return uploadedImage
  }
)

export const reloadUser = createAsyncThunk('user/reloadUser', async (userId: string) => {
  if (userId) {
    const userRef = doc(firestore, 'users', userId)
    const docSnap = await getDoc(userRef)
    return docSnap.data() as User
  }
  return {} as User
})

const user = createSlice({
  name: SLICE_NAME.USER,
  initialState: initialState,
  reducers: {
    onSetUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    },
    onSetFollowingUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.followingUsers = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(reloadUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(updateAvatar.fulfilled, (state, { payload }) => {
      if (state.user) state.user.avatar = payload.uri
    })
  }
})

const userReducer = user.reducer

export default userReducer

export const { onSetUser, onSetFollowingUsers } = user.actions
