import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import cardReducer from '../features/card/cardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    card: cardReducer,
  },
  devTools: false
})