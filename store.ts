/*
import cartReducer from './features/cart/CartSlice';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/CounterSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const persistConfig = {
  key: 'root',
  storage,
}
const persistedCouonterReducer = persistReducer(persistConfig, counterReducer)
const persistedCartReducer = persistReducer(persistConfig, cartReducer)
export const store = configureStore({
  reducer: {
    counter: persistedCouonterReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
*/

import cartReducer from './features/cart/CartSlice';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/CounterSlice'
import customerReducer from './features/customer/CustomerSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    customer: customerReducer,
  }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch