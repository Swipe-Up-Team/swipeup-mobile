import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from './all-reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app', 'systemAssets', 'video']
}
const persistedReducer = persistReducer(persistConfig, allReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export default store

export type AppDispatch = typeof store.dispatch
