import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
export interface AdminState {
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
    }, 
    updateStoreHour: (state, { payload }: PayloadAction<IHours[]>) => {
      state.store_info.hours.splice(0, state.store_info.hours.length, ...payload);
    }, 
    toggleServer: (state, { payload } : PayloadAction<boolean>) => {
      state.store_info.server_is_on = payload
    }
  }
})

export default adminSlice.reducer

export const { getInitialStoreInfo, updateStoreHour, toggleServer } = adminSlice.actions

export const storeInfo = (state: AdminState) => state.store_info;

