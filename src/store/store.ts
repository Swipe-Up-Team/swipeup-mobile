import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from './all-reducers'

const store = configureStore({
  reducer: allReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
