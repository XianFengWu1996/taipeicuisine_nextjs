import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CartState {
    cart: ICartItem[],
    cart_quantity: number,
    tip: number,
    tax: number,
    subtotal: number,
    total: number,
    isDelivery: boolean,
}

// Define the initial state using that type
const initialState: CartState = {
    cart: [],
    cart_quantity: 0,
    subtotal: 0,
    tip: 0,
    tax: 0,
    total: 0,
    isDelivery: false,
    // delivery comments
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // CART RELATED
    addToCart: (state, { payload } : PayloadAction<ICartItem>) => {
      // CASE ONE: customer added a item 
        let index = state.cart.findIndex(item => item.id === payload.id);

        if(index !== -1){
          // update the quantiy and total of the dish
          state.cart[index] = {
            ...state.cart[index],
            quantity: state.cart[index].quantity + payload.quantity,
            total: state.cart[index].total + payload.total,
          }
        } else {
          state.cart.push(payload); // add the item to the cart

          // sort the dish
          state.cart.sort((a, b) => {
            if(a.dish.label_id === b.dish.label_id) return 0;
            return a.dish.label_id > b.dish.label_id ? 1 : -1
          });
        }  

        state.cart_quantity += payload.quantity; // update the quantity of the cart
        state.subtotal = Number((state.subtotal + payload.total).toFixed(2)); // add the dish total to the subtotal
        state.tax = Number((state.subtotal * 0.07).toFixed(2))
        state.total = Number((state.subtotal + state.tax).toFixed(2))
    },
    increaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
      state.cart[index] = {
        ...item,
        quantity: payload.quantity + 1,
        total: Number((item.total + item.dish.price).toFixed(2))
      }

      state.cart_quantity = state.cart_quantity + 1;
      state.subtotal = Number((state.subtotal + payload.dish.price).toFixed(2));
      state.tax = Number((state.subtotal * 0.07).toFixed(2))
      state.total = Number((state.subtotal + state.tax).toFixed(2))    
    },
    decreaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
      state.cart[index] = {
        ...item,
        quantity: payload.quantity - 1,
        total: Number((item.total - item.dish.price).toFixed(2))
      }

      state.cart_quantity = state.cart_quantity - 1;
      state.subtotal = Number((state.subtotal - payload.dish.price).toFixed(2));
      state.tax = Number((state.subtotal * 0.07).toFixed(2))
      state.total = Number((state.subtotal + state.tax).toFixed(2))    
    },
    removeItemFromCart: (state, {payload} : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex(item => item.id === payload.id); 
      state.cart.splice(index, 1);

      state.cart_quantity = state.cart_quantity - payload.quantity
      state.subtotal = Number((state.subtotal - payload.total).toFixed(2));
      state.tax = Number((state.subtotal * 0.07).toFixed(2));
      state.total = Number((state.subtotal + state.tax).toFixed(2));
    },
    clearCart: (state) => {
      state.cart = [];
      state.cart_quantity = 0
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
    },  
    // DELIVERY RELATED
    deliveryToggle: (state) => {
      state.isDelivery = !state.isDelivery
    }
  }
})

export default cartSlice.reducer

export const {  
 addToCart,
 increaseQty,
 decreaseQty,
 removeItemFromCart,
 clearCart,
 deliveryToggle
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;