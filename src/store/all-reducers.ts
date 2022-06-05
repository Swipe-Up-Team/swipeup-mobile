import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './reducers/app-reducer'
import { persistReducer } from 'redux-persist'
import systemAssetsReducer from './reducers/system-assets-reducer'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp', 'showDialog', 'loading']
}

export const allReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  systemAssets: systemAssetsReducer
})

export type RootState = ReturnType<typeof allReducer>
