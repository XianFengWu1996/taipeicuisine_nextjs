import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

// Define the initial state using that type
const initialState: ICartState = {
    order_id: v4(),
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
    dont_include_utensils: false, 
    schedule_time: '',
}

const calculateTotal = (state: ICartState) => {

  // handle lunch count and discount
  let lunchCount = 0;
  let lunchDiscount = 0;
  let point_redemption_discount = 0;
  
  let original_subtotal = 0;
  let cart_quantity = 0;

  state.cart.forEach((item) => {
    if(item.dish.is_lunch){
      lunchCount += item.quantity;
    }
    original_subtotal += item.total
    cart_quantity += item.quantity
  })

  if(isEmpty(state.cart)){
    point_redemption_discount = 0;
    state.point_redemption = 0;
  } else {
    point_redemption_discount = Number((state.point_redemption / 100).toFixed(2));
  }
  
  lunchDiscount = Math.floor(lunchCount / 3) * 2.9;
  original_subtotal = Number((original_subtotal).toFixed(2));;
  const subtotal = Number((original_subtotal - point_redemption_discount - state.lunch_discount).toFixed(2))
  

  state.cart_quantity = cart_quantity;
  state.original_subtotal = original_subtotal;
  state.subtotal = subtotal;
  state.tax = Number((subtotal * 0.07).toFixed(2))
  state.total = Number((subtotal + state.tax + state.tip + (state.is_delivery ? state.delivery_fee : 0)).toFixed(2))
  state.lunch_discount = lunchDiscount
  state.point_redemption = point_redemption_discount;
  state.payment_type = '' // reset the payment type

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
        calculateTotal(state);
    },
    increaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
      // the dish price already include the option price
      state.cart[index] = {
        ...item,
        quantity: payload.quantity + 1,
        total: Number((item.total + item.dish.price + (item.customize ? item.customize.total : 0)).toFixed(2))
      }

      calculateTotal(state); 
    },
    decreaseQty: (state, { payload } : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex((item) => item.id === payload.id);

      let item = state.cart[index];
   
      // the dish price already include the option price
      state.cart[index] = {
        ...item,
        quantity: payload.quantity - 1,
        total: Number((item.total - item.dish.price - (item.customize ? item.customize.total : 0)).toFixed(2))
      }
      calculateTotal(state)
    },
    removeItemFromCart: (state, {payload} : PayloadAction<ICartItem>) => {
      let index = state.cart.findIndex(item => item.id === payload.id); 
      state.cart.splice(index, 1);
      calculateTotal(state);
    },
    updateCartItem: (state, { payload } : PayloadAction<IDish>) => {
      let index = state.cart.findIndex(item => item.dish.id === payload.id)

      let option_price = state.cart[index].option?.price ?? 0
      state.cart[index].dish = payload;
      state.cart[index].total = (payload.price + option_price) * state.cart[index].quantity;

      calculateTotal(state);
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
    orderComplete: () => {
      return {
        ...initialState,
        order_id: v4(),
      }
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
          state.tip = Number((state.original_subtotal * .10).toFixed(2));
        break;

        case '15%':
          state.tip = Number((state.original_subtotal * .15).toFixed(2));
        break;

        case '18%':
          state.tip = Number((state.original_subtotal * .18).toFixed(2));
        break;

        case '20%':
          state.tip = Number((state.original_subtotal * .20).toFixed(2));
        break;

        default:
          state.tip = Number((state.original_subtotal * 0).toFixed(2));
          break;
      }
    },
    setCustomTip: (state, { payload }: PayloadAction<number>) => {
      state.tip = Number((payload).toFixed(2));
      calculateTotal(state);
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
      state.dont_include_utensils = payload;
    },
    setDelivery: (state, {payload}: PayloadAction<number>) => {
      state.delivery_fee = payload;
      calculateTotal(state);
    },
    setScheduleTime: (state, { payload }: PayloadAction<string>) => {
      state.schedule_time = payload
    },
  } 
})

export default cartSlice.reducer

export const {  
  addToCart,
  increaseQty,
  decreaseQty,
  removeItemFromCart,
  updateCartItem,
  clearCart,
  deliveryToggle,
  setTip,
  setCustomTip,
  setPayment,
  setComments,
  setPointRedemption,
  setToggleIncludeUtensils,
  setDelivery,
  orderComplete,
  setScheduleTime
} = cartSlice.actions

// export const menus = (state: MenuState) => state.menus;