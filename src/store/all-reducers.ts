import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import { persistReducer } from 'redux-persist'
import userReducer from './reducers/user-reducer'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp', 'showDialog', 'loading']
}

export const allReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  user: userReducer
})

export type RootState = ReturnType<typeof allReducer>
