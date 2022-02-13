import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  currentSelectedDish: IDish,
  currentSelectedMenu: IMenu,
  currentSelectedTab: number,
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  currentSelectedDish: {} as IDish,
  currentSelectedMenu: {} as IMenu,
  currentSelectedTab: 0,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // menus
    getInitialMenuData: (state, { payload } : PayloadAction<IMenu[]>) => {
      // assign the menus
      state.menus = payload;
  
      // initialize the default menu
      state.currentSelectedMenu = state.menus[0];
    }, 
    getCurrentDish: (state, {payload} : PayloadAction<IDish>) => {
      state.currentSelectedDish = payload
    },
    handleOnMenuChange: (state, {payload} : PayloadAction<IMenu>) => {
      state.currentSelectedMenu = payload
    },
    handleOnTabChange: (state, {payload} : PayloadAction<number>) => {
      state.currentSelectedTab = payload
    },
  }
})

export default menuSlice.reducer

export const {  
    getInitialMenuData,
    getCurrentDish,
    handleOnMenuChange,
    handleOnTabChange,
} = menuSlice.actions

export const menus = (state: MenuState) => state.menus;