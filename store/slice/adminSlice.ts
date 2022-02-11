import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface AdminState {
  store_info: IStore,
}

// Define the initial state using that type
const initialState: AdminState = {
  store_info: {} as IStore,
}

export const adminSlice = createSlice({
  name: 'admin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getInitialStoreInfo: (state, { payload }: PayloadAction<IStore>) => {
      state.store_info = {
        ...payload
      }
    }
  }
})

export default adminSlice.reducer

export const { getInitialStoreInfo } = adminSlice.actions

export const storeInfo = (state: AdminState) => state.store_info;

