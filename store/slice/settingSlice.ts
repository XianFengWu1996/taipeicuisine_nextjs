import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: ISettingState  = {
    // dialog 
    show_login_dialog: false,
    show_sms_dialog: false,

    // card
    show_customer_card: false,
    show_address_card: false,

    // skeleton
    show_checkout_skeleton: false,

    // payment 
    allow_payment_page: false,
    

    language: 'english',
    theme_mode: 'light'
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
    setShowAddressCard: (state, {payload}:PayloadAction<boolean>) => {
      state.show_address_card = payload;
    },
    setShowCustomerCard: (state, {payload}:PayloadAction<boolean>) => {
      state.show_customer_card = payload;
    },
    setCheckoutSkeleton: (state, {payload}:PayloadAction<boolean>) => {
      state.show_checkout_skeleton = payload;
    },
    setAllowPayment: (state, {payload}:PayloadAction<boolean>) => {
      state.allow_payment_page = payload;
    },
    setLanguage: (state, {payload}:PayloadAction<string>) => {
      state.language = payload;
    },
    setThemeMode: (state, {payload}:PayloadAction<ThemeMode>) => {
      state.theme_mode = payload;
    },
    
    
  }
})

export default settingSlice.reducer

export const {  
  setShowCustomerCard,
  setShowLoginDialog,
  setShowSmsDialog,
  setShowAddressCard,
  setCheckoutSkeleton,
  setAllowPayment,
  setLanguage,
  setThemeMode
} = settingSlice.actions

