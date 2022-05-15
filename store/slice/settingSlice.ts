import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: ISettingState  = {
    show_login_dialog: false,
    smsDialogOpen: false,

    customerSaveLoading: false,
    customerCardLoading: false,

    customerCollapse: false,
    addressCollapse: false,

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
    setSmsDialog: (state, {payload}:PayloadAction<boolean>) => {
      state.smsDialogOpen = payload;
    },
 
    setCustomerSaveLoading: (state, {payload}:PayloadAction<boolean>) => {
      state.customerSaveLoading = payload;
    },
    setCustomerCardLoading:(state, {payload}:PayloadAction<boolean>) => {
      state.customerCardLoading = payload;
    },

    setAddressCollapse: (state, {payload}:PayloadAction<boolean>) => {
      state.addressCollapse = payload;
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
  setSmsDialog,
  setCustomerSaveLoading,
  setCustomerCardLoading,
  setAddressCollapse,
  setCheckoutSkeleton,
} = settingSlice.actions

