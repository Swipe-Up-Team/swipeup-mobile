import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '@src/config'
import { SLICE_NAME } from '@src/constants/enums'
import { User } from '@src/models'
import { doc, getDoc } from 'firebase/firestore'

export interface UserState {
  user?: User
  followingUsers?: User[]
}

const initialState: UserState = {
  user: undefined,
  followingUsers: undefined
}

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
    onSetUser: (state, { payload }: PayloadAction<User | undefined>) => {
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
  }
})

const userReducer = user.reducer

export default userReducer

export const { onSetUser, onSetFollowingUsers } = user.actions
