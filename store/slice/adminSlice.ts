import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface AdminState {
  store_info: IStore,
  login_loading: boolean
}

// Define the initial state using that type
const initialState: AdminState = {
  store_info: {} as IStore,
  login_loading: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // store data
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
    },

    // LOADING 
    toggleLoginLoading: (state, { payload } : PayloadAction<boolean>) => {
      state.login_loading = payload
    },
  }
})

export default adminSlice.reducer

export const { 
    getInitialStoreInfo, 
    updateStoreHour, 
    toggleServer, 
    toggleLoginLoading
} = adminSlice.actions

export const storeInfo = (state: AdminState) => state.store_info;
export const login_loading = ((state: AdminState) => state.login_loading )
