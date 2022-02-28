import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';


// Define a type for the slice state
export interface CartState {
    cart: ICartItem[],
    cart_quantity: number,
    tip: number,
    tax: number,
    subtotal: number,
    total: number,
}

// Define the initial state using that type
const initialState: CartState = {
    cart: [],
    cart_quantity: 0,
    tip: 0,
    tax: 0,
    subtotal: 0,
    total: 0,
    // delivery comments
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload } : PayloadAction) => {
    
      }, 
  }
})

export default cartSlice.reducer

export const {  
 addToCart
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;