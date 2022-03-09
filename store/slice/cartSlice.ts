import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CartState {
    cart: ICartItem[],
    cart_quantity: number,
    original_subtoal:number,
    subtotal: number,
    tip: number,
    tax: number,
    total: number,

    is_delivery: boolean,
    tip_type: string,
    payment_type: string,
    comments: string, 
    point_redemption: number,
    includeUtensils: boolean,
}

// Define the initial state using that type
const initialState: CartState = {
    cart: [],
    cart_quantity: 1,
    original_subtoal: 13.95,
    subtotal: 13.95,
    tip: 0,
    tax: 0.98,
    total: 14.93,

    // cart: [],
    // cart_quantity: 0,
    // original_subtoal: 0,
    // subtotal: 0,
    // tip: 0,
    // tax: 0,
    // total: 0,

    is_delivery: false,
    tip_type: '',
    payment_type: '',
    comments: '',
    point_redemption: 0,
    includeUtensils: false, 
}

const calculateTipTotal = (state: CartState, value: number) => {
  state.tip = Number((state.subtotal * value).toFixed(2));
  state.total = Number((state.subtotal + state.tip + state.tax).toFixed(2));
}

const calculateTotal = (state: CartState, value:number = 0, quantity: number = 0) => {
  let discount = Number((state.point_redemption / 100).toFixed(2));

  state.cart_quantity = state.cart_quantity + quantity;
  state.original_subtoal = Number((state.original_subtoal + value).toFixed(2));
  state.subtotal = Number((state.original_subtoal - discount).toFixed(2));
  state.tax = Number((state.subtotal * 0.07).toFixed(2))
  state.total = Number((state.subtotal + state.tax).toFixed(2))
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

         // update the quantity of the cart
        calculateTotal(state, payload.total, payload.quantity);
    },
    increaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
      state.cart[index] = {
        ...item,
        quantity: payload.quantity + 1,
        total: Number((item.total + item.dish.price).toFixed(2))
      }

      calculateTotal(state, payload.dish.price, 1); 
    },
    decreaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
      state.cart[index] = {
        ...item,
        quantity: payload.quantity - 1,
        total: Number((item.total - item.dish.price).toFixed(2))
      }
      calculateTotal(state, -payload.dish.price, -1)
    },
    removeItemFromCart: (state, {payload} : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex(item => item.id === payload.id); 
      state.cart.splice(index, 1);

      calculateTotal(state, -payload.total, -payload.quantity);
    },
    clearCart: (state) => {
      state.cart = [];
      state.cart_quantity = 0
      state.original_subtoal = 0,
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
    },  
    // DELIVERY RELATED
    deliveryToggle: (state) => {
      state.is_delivery = !state.is_delivery
    },

    //TIP RELATED
    setTip: (state, {payload} : PayloadAction<string>) => {
      state.tip_type = payload;

      switch (payload) {
        case '10%':
          // state.tip = Number((state.subtotal * 0.10).toFixed(2));
          // state.total = Number((state.subtotal + state.tip).toFixed(2));
          calculateTipTotal(state, .10);
        break;

        case '15%':
          calculateTipTotal(state, .15);
        break;

        case '18%':
          calculateTipTotal(state, .18);
        break;

        case '20%':
          calculateTipTotal(state, .20);
        break;

        default:
          calculateTipTotal(state, 0);
          break;
      }
    },
    setCustomTip: (state, { payload }: PayloadAction<number>) => {
      state.tip = Number((payload).toFixed(2));
      state.total = Number((state.subtotal + state.tip + state.tax).toFixed(2));
    },
    // PAYMENT RELATED
    setPayment: (state, {payload} : PayloadAction<string>) => {
      // payment_type: online, cash, or instore
      state.payment_type = payload
    },
    // COMMENT RELATED
    setComments: (state, {payload} : PayloadAction<string>) => {
      state.comments = payload
    },
    // POINT REDEMPTION
    setPointRedemption: (state, {payload} : PayloadAction<number>) => {
      let limit = Math.floor((state.original_subtoal / 2) * 100); // then the limit for the order will be half of the the subtotal will be 697.5 points

      if(payload > limit){
        state.point_redemption = limit;
      } else {
        state.point_redemption = payload
      }

      calculateTotal(state);

    },
    // UTENSILS
    setToggleIncludeUtensils:(state, {payload} : PayloadAction<boolean>) => {
      state.includeUtensils = payload;
    },
  }
})

export default cartSlice.reducer

export const {  
  addToCart,
  increaseQty,
  decreaseQty,
  removeItemFromCart,
  clearCart,
  deliveryToggle,
  setTip,
  setCustomTip,
  setPayment,
  setComments,
  setPointRedemption,
  setToggleIncludeUtensils
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;