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
    subtotal: 0,
    tip: 0,
    tax: 0,
    total: 0,
    // delivery comments
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload } : PayloadAction<ICartItem>) => {
        state.cart.push(payload); // add the item to the cart
        state.cart_quantity += payload.quantity; // update the quantity of the cart
        state.subtotal += Number(payload.total.toFixed(2)); // add the dish total to the subtotal
        state.tax += Number((payload.total * 0.07).toFixed(2))
        state.total = Number((state.subtotal + state.tax).toFixed(2))
    }, 
  }
})

export default cartSlice.reducer

export const {  
 addToCart
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;