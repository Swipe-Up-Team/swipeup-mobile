import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app-slice'

const rootReducer = {
  app: appReducer
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
