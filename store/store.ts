import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './slice/cartSlice';
import customerSlice from './slice/customerSlice';
import menuSlice from './slice/menuSlice';
import storeSlice from './slice/storeSlice';
import storage from 'redux-persist/lib/storage'
import settingSlice from './slice/settingSlice';
import persistSettingSlice from './slice/persistSetting';


import { persistStore, persistReducer} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menus', 'cart', 'persistSetting', 'store'] // only persist certain reducers
}

const reducer = combineReducers({ 
  menus: menuSlice,
  cart: cartSlice,
  customer: customerSlice, 
  store: storeSlice,
  setting: settingSlice,
  persistSetting: persistSettingSlice
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store


// const reducer = combineReducers({ 
//   admin: adminSlice,
//   menus: menuSlice,
//   cart: cartSlice,
//   customer: customerSlice, 
// })



// export const store = configureStore({
//   reducer: reducer,
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store;