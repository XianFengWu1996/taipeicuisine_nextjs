import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';


// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  expiration: number,
  selectedMenu: IMenu,
  selectedCategory: ICategory,
  selectedTab: number,
  dishes: IDish[]
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  expiration: 0,
  dishes: [],
  selectedMenu: {} as IMenu,
  selectedCategory: {} as ICategory,
  selectedTab: 0,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // menus
    getInitialMenuData: (state, { payload } : PayloadAction<{ menus: IMenu[], dishes: [], expiration: number}>) => {
      // assign the menus
      if(payload){
        state.menus = payload.menus;
        state.dishes = payload.dishes;
        state.expiration = payload.expiration
      }
  
      // // initialize the default menu
      state.selectedMenu = state.menus[0];
      state.selectedCategory = state.menus[0].category[0];
    }, 
    handleOnMenuChange: (state, {payload} : PayloadAction<IMenu>) => {
      state.selectedMenu = payload
      state.selectedCategory = payload.category[0]; // set the category to the first one in the menu
      state.selectedTab = 0; // set to the first tab
    },
    handleOnTabChange: (state, {payload} : PayloadAction<{ tabIndex: number, category: ICategory}>) => {
      state.selectedTab = payload.tabIndex
      if(!isEmpty(payload.category)){
        state.selectedCategory = payload.category
      }
    },
    resetUponUnmount: (state) => {
      state.selectedMenu = state.menus[0];;
      state.selectedCategory = state.menus[0].category[0];
      state.selectedTab = 0;
    }
  }
})

export default menuSlice.reducer

export const {  
    getInitialMenuData,
    handleOnMenuChange,
    handleOnTabChange,
    resetUponUnmount
} = menuSlice.actions

export const menus = (state: MenuState) => state.menus;