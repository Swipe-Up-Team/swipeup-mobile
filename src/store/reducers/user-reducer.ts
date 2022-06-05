import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SLICE_NAME } from "@src/constants/enums"
import { User } from "@src/models"

export interface UserState {
  user?: User
}

const initialState: UserState = {
  user: undefined
}

const user = createSlice({
  name: SLICE_NAME.USER,
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    }
  }
})

const userReducer = user.reducer

export default userReducer

export const { setUser } = user.actions