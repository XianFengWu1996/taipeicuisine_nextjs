import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: ISettingState  = {
    show_login_dialog: false,
    show_sms_dialog: false,

    customerSaveLoading: false,
    customerCardLoading: false,

    customerCollapse: false,
    show_address_card: false,

    showSkeleton: false,

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
 
    setCustomerSaveLoading: (state, {payload}:PayloadAction<boolean>) => {
      state.customerSaveLoading = payload;
    },
    setCustomerCardLoading:(state, {payload}:PayloadAction<boolean>) => {
      state.customerCardLoading = payload;
    },

    setShowAddressCard: (state, {payload}:PayloadAction<boolean>) => {
      state.show_address_card = payload;
    },
    setCustomerCollapse: (state, {payload}:PayloadAction<boolean>) => {
      state.customerCollapse = payload;
    },
    setCheckoutSkeleton: (state, {payload}:PayloadAction<boolean>) => {
      state.showSkeleton = payload;
    },
   
    
  }
})

export default settingSlice.reducer

export const {  
  setCustomerCollapse,
  setShowLoginDialog,
  setShowSmsDialog,
  setCustomerSaveLoading,
  setCustomerCardLoading,
  setShowAddressCard,
  setCheckoutSkeleton,
} = settingSlice.actions

