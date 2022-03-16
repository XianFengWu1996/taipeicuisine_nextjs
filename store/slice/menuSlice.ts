import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';


// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  expiration: number,
  currentSelectedDish: IDish,
  currentSelectedMenu: IMenu,
  currentSelectedCategory: ICategory,
  currentSelectedTab: number,
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  expiration: 0,
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
    getInitialMenuData: (state, { payload } : PayloadAction<{ menus: IMenu[], expiration: number}>) => {
      // assign the menus
      if(payload){
        state.menus = payload.menus;
        state.expiration = payload.expiration
      }
  
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
    handleOnTabChange: (state, {payload} : PayloadAction<{ tabIndex: number, category?: ICategory | undefined}>) => {
      state.currentSelectedTab = payload.tabIndex
      if(payload.category && !isEmpty(payload.category)){
        state.currentSelectedCategory = payload.category
      }
    },
    handleUpdateDish: (state, { payload } : PayloadAction<IDish>) => {
      let menus = state.menus.find((menu) => menu.id === state.currentSelectedMenu.id);

      if(menus){
        let category = menus.category.find((category) => category.id === state.currentSelectedCategory.id);
        if(category){
          let index = category.dishes.findIndex((dish) =>  dish.id === payload.id);
          category.dishes.splice(index, 1, payload);
          state.currentSelectedCategory.dishes.splice(index, 1, payload);
        }
      }
    },
    resetUponUnmount: (state) => {
      state.currentSelectedMenu = state.menus[0];;
      state.currentSelectedCategory = state.menus[0].category[0];
      state.currentSelectedDish = {} as IDish;
      state.currentSelectedTab = 0;
    }
  }
})

export default menuSlice.reducer

export const {  
    getInitialMenuData,
    getCurrentDish,
    handleOnMenuChange,
    handleOnTabChange,
    handleUpdateDish,
    resetUponUnmount
} = menuSlice.actions

export const menus = (state: MenuState) => state.menus;