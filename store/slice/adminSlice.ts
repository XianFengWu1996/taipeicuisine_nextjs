import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface AdminState {
  store_info: IStore,
  menus: IMenu[],
  currentSelectedDish: IDish,
}

// Define the initial state using that type
const initialState: AdminState = {
  store_info: {} as IStore,
  menus: [],
  currentSelectedDish: {} as IDish
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
    
    // menus
    getInitialMenuData: (state, { payload } : PayloadAction<IMenu[]>) => {
      state.menus = payload;
    }, 
    // getCurrentDish: (state, {payload} : PayloadAction<IDish>) => {
    //   state.currentSelectedDish = payload
    // },
  }
})

export default adminSlice.reducer

export const { 
    getInitialStoreInfo, 
    updateStoreHour, 
    toggleServer, 
    getInitialMenuData,
    // getCurrentDish
} = adminSlice.actions

export const storeInfo = (state: AdminState) => state.store_info;

export const menus = (state: AdminState) => state.menus;

