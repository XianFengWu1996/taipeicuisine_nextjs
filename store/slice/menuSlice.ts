import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';


// Define a type for the slice state
export interface MenuState {
  menus: IMenu[],
  expiration: number,
  selectedDish: IDish,
  selectedMenu: IMenu,
  selectedCategory: ICategory,
  selectedTab: number,
}

// Define the initial state using that type
const initialState: MenuState = {
  menus: [],
  expiration: 0,
  selectedMenu: {} as IMenu,
  selectedCategory: {} as ICategory,
  selectedDish: {} as IDish,
  selectedTab: 0,
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
  
      // // initialize the default menu
      state.selectedMenu = state.menus[0];
      state.selectedCategory = state.menus[0].category[0];
    }, 
    getCurrentDish: (state, {payload} : PayloadAction<IDish>) => {
      state.selectedDish = payload
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
    handleUpdateDish: (state, { payload } : PayloadAction<IDish>) => {
      let menus = state.menus.find((menu) => menu.id === state.selectedMenu.id);

      if(menus){
        let category = menus.category.find((category) => category.id === state.selectedCategory.id);
        if(category){
          let index = category.dishes.findIndex((dish) =>  dish.id === payload.id);
          category.dishes.splice(index, 1, payload);
          state.selectedCategory.dishes.splice(index, 1, payload);
        }
      }
    },
    resetUponUnmount: (state) => {
      state.selectedMenu = state.menus[0];;
      state.selectedCategory = state.menus[0].category[0];
      state.selectedDish = {} as IDish;
      state.selectedTab = 0;
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