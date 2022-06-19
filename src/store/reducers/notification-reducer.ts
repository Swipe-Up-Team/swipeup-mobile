import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getState } from '@src/common'
import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT, SLICE_NAME } from '@src/constants'
import { doc, getDoc } from 'firebase/firestore'

export interface NotificationState {
  expoToken?: string
  lastSeen?: number
}

const initialState: NotificationState = {
  expoToken: undefined,
  lastSeen: undefined
}

export const fetchNotifications = createAsyncThunk('notifications/fetchList', async () => {
  const { user } = getState('user')
  if (!user) return []

  const notiRef = doc(firestore, FIRESTORE_ENDPOINT.NOTIFICATIONS, user.id)
  const docSnap = await getDoc(notiRef)
  return docSnap.data() as Notification[]
})

const notification = createSlice({
  name: SLICE_NAME.NOTIFICATION,
  initialState: initialState,
  reducers: {
    onSetExpoPushToken: (state, { payload }: PayloadAction<string>) => {
      state.expoToken = payload
    },
    onSetLastSeenNotification: (state, { payload }: PayloadAction<number>) => {
      state.lastSeen = payload
    }
  },
  extraReducers(builder) {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, { payload }: PayloadAction<Notification[]>) => {
        // state.expoToken = payload
      }
    )
  }
})

const notificationReducer = notification.reducer

export default notificationReducer

export const { onSetExpoPushToken, onSetLastSeenNotification } = notification.actions
