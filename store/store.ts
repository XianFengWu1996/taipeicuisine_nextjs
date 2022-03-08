import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import adminSlice from './slice/adminSlice';
import cartSlice from './slice/cartSlice';
import customerSlice from './slice/customerSlice';
import menuSlice from './slice/menuSlice';

const reducer = combineReducers({ 
  admin: adminSlice,
  menus: menuSlice,
  cart: cartSlice,
  customer: customerSlice, 
})

export const store = configureStore({
  reducer: reducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;