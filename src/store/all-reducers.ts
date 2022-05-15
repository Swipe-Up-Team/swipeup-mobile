import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './app-reducer'
import { persistReducer } from 'redux-persist'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp', 'showDialog', 'loading']
}

export const allReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer)
})

export type RootState = ReturnType<typeof allReducer>
