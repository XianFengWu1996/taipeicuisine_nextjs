import { createSlice, PayloadAction } from '@reduxjs/toolkit'



// Define the initial state using that type
const initialState: ICartState = {
    cart: [],
    cart_quantity: 0,
    original_subtotal: 0,
    subtotal: 0,
    delivery_fee: 0,
    tip: 0,
    tax: 0,
    total: 0,

    lunch_discount: 0,

    is_delivery: false,
    tip_type: '',
    payment_type: '',
    comments: '',
    point_redemption: 0,
    includeUtensils: false, 
}

const calculateTipTotal = (state: ICartState, value: number) => {
  state.tip = Number((state.subtotal * value).toFixed(2));
  state.total = Number((state.subtotal + state.tip + state.tax).toFixed(2));
}

const calculateTotal = (state: ICartState, value:number = 0, quantity: number = 0) => {

  // handle lunch count and discount

  let lunchCount = 0;
  let discount = 0;

  state.cart.forEach((item) => {
    if(item.dish.is_lunch){
      lunchCount += item.quantity;
    }
  })

  if(state.cart.length <= 0){
    discount = 0;
    state.point_redemption = 0;
    state.payment_type = ''
  } else {
    discount = Number((state.point_redemption / 100).toFixed(2));
  }

  state.lunch_discount = Math.floor(lunchCount / 3) * 2.9

  state.cart_quantity = state.cart_quantity + quantity;
  state.original_subtotal = Number((state.original_subtotal + value).toFixed(2));
  state.subtotal = Number((state.original_subtotal - discount - state.lunch_discount).toFixed(2));
  state.tax = Number((state.subtotal * 0.07).toFixed(2))
  state.total = Number((state.subtotal + state.tax +(state.is_delivery ? state.delivery_fee : 0) ).toFixed(2))
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
      state.original_subtotal = 0,
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
      calculateTotal(state);
    },  
    // DELIVERY RELATED
    deliveryToggle: (state) => {
      state.is_delivery = !state.is_delivery;
      state.payment_type = '';
      calculateTotal(state);
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
    setPayment: (state, {payload} : PayloadAction<IPaymentType>) => {
      // payment_type: online, cash, or instore
      state.payment_type = payload
    },
    // COMMENT RELATED
    setComments: (state, {payload} : PayloadAction<string>) => {
      state.comments = payload
    },
    // POINT REDEMPTION
    setPointRedemption: (state, {payload} : PayloadAction<number>) => {
      let limit = Math.floor((state.original_subtotal / 2) * 100); // then the limit for the order will be half of the the subtotal will be 697.5 points

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
    setDelivery: (state, {payload}: PayloadAction<number>) => {
      state.delivery_fee = payload;
      calculateTotal(state);
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
  deliveryToggle,
  setTip,
  setCustomTip,
  setPayment,
  setComments,
  setPointRedemption,
  setToggleIncludeUtensils,
  setDelivery
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;