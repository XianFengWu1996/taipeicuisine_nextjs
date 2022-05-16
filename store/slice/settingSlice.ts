import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: ISettingState  = {
    show_login_dialog: false,
    show_sms_dialog: false,

    save_name_loading: false,
    customer_card_loading: false,

    show_customer_card: false,
    show_address_card: false,

    show_checkout_skeleton: false,

    // payment 
    allow_payment_page: false
}   


export const settingSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // STATES RELATD
    setShowLoginDialog: (state, {payload}:PayloadAction<boolean>) => {
      state.show_login_dialog = payload;
    },
    setShowSmsDialog: (state, {payload}:PayloadAction<boolean>) => {
      state.show_sms_dialog = payload;
    },
 
    setSaveNameLoading: (state, {payload}:PayloadAction<boolean>) => {
      state.save_name_loading = payload;
    },
    setCustomerCardLoading:(state, {payload}:PayloadAction<boolean>) => {
      state.customer_card_loading = payload;
    },

    setShowAddressCard: (state, {payload}:PayloadAction<boolean>) => {
      state.show_address_card = payload;
    },
    setShowCustomerCard: (state, {payload}:PayloadAction<boolean>) => {
      state.show_customer_card = payload;
    },
    setCheckoutSkeleton: (state, {payload}:PayloadAction<boolean>) => {
      state.show_checkout_skeleton = payload;
    },
   
    
  }
})

export default settingSlice.reducer

export const {  
  setShowCustomerCard,
  setShowLoginDialog,
  setShowSmsDialog,
  setSaveNameLoading,
  setCustomerCardLoading,
  setShowAddressCard,
  setCheckoutSkeleton,
} = settingSlice.actions

