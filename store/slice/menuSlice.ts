import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';

// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  currentSelectedDish: IDish,
  currentSelectedMenu: IMenu,
  currentSelectedCategory: ICategory,
  currentSelectedTab: number,
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  currentSelectedMenu: {} as IMenu,
  currentSelectedCategory: {} as ICategory,
  currentSelectedDish: {} as IDish,
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
      state.currentSelectedCategory = state.menus[0].category[0];
    }, 
    getCurrentDish: (state, {payload} : PayloadAction<IDish>) => {
      state.currentSelectedDish = payload
    },
    handleOnMenuChange: (state, {payload} : PayloadAction<IMenu>) => {
      state.currentSelectedMenu = payload
      state.currentSelectedCategory = payload.category[0]; // set the category to the first one in the menu
      state.currentSelectedTab = 0; // set to the first tab
    },
    handleOnTabChange: (state, {payload} : PayloadAction<{ tabIndex: number, category: ICategory}>) => {
      state.currentSelectedTab = payload.tabIndex
      if(!isEmpty(payload.category)){
        state.currentSelectedCategory = payload.category
      }
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