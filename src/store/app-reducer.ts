import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from '../constants/enums'
import { ThemeType } from '../themes'

export interface AppState {
  internetState: boolean
  profile: any
  token?: string
  status: number
  loadingApp: boolean
  loading: number
  showDialog: boolean
  theme: 'default' | 'dark'
}

const initialState: AppState = {
  internetState: true,
  profile: {},
  token: undefined,
  status: 200,

  loadingApp: false,
  showDialog: false,
  loading: 0,
  theme: 'default'
}

const app = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialState,
  reducers: {
    onSetInternet: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload
    },
    onSetToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    onSetAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload
    },
    onSetAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload
    },
    onLoadApp: state => {
      state.loadingApp = true
    },
    onLoadAppEnd: state => {
      state.loadingApp = false
    },
    onStartProcess: state => {
      state.showDialog = true
    },
    onEndProcess: state => {
      state.showDialog = false
    },
    onLogout: state => {
      state.token = undefined
      state.profile = {}
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = state.loading + 1
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state, action) => {
          const errorCode = action.payload.errorCode
          if (errorCode) {
            state.status = errorCode
          }
          state.loading = state.loading - 1
        }
      )
  }
})

const appReducer = app.reducer
export default appReducer
export const {
  onSetInternet,
  onSetToken,
  onSetAppProfile,
  onSetAppTheme,
  onLoadApp,
  onLoadAppEnd,
  onStartProcess,
  onEndProcess,
  onLogout
} = app.actions
