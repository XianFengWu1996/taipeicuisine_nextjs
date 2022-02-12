import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  currentSelectedDish: IDish,
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  currentSelectedDish: {} as IDish
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // menus
    getInitialMenuData: (state, { payload } : PayloadAction<IMenu[]>) => {
      state.menus = payload;
    }, 
    getCurrentDish: (state, {payload} : PayloadAction<IDish>) => {
      state.currentSelectedDish = payload
    },
  }
})

export default menuSlice.reducer

export const {  
    getInitialMenuData,
    getCurrentDish
} = menuSlice.actions

export const menus = (state: MenuState) => state.menus;