import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import { persistReducer } from 'redux-persist'
import systemAssetsReducer from './reducers/system-assets-reducer'
import userReducer from './reducers/user-reducer'
import chatReducer from './reducers/chat-reducer'
import notificationReducer from './reducers/notification-reducer'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp', 'showDialog', 'loading']
}

export const allReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  user: userReducer,
  chat: chatReducer,
  systemAssets: systemAssetsReducer,
  expoToken: notificationReducer
})

export type RootState = ReturnType<typeof allReducer>
