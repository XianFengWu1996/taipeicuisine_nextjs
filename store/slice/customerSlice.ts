import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

// Define the initial state using that type
const initialState: ICustomer  = {
    name: '',
    phone: '',
    address:{
        address: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        delivery_fee: 0,
        business: '',
        apt: '',
    }, 
    reward: {
        points: 0,
        transactions: []
    }
}   

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // PHONE RELATED 
    addNewPhone: (state, { payload } : PayloadAction<{phone: string}>) => {
      state.phone = payload.phone
    },
    // NAME RELATED
    getCustomer: (state, {payload} : PayloadAction<ICustomer>) => {
      state.address = { ... payload.address }
      state.name = payload.name
      state.phone = payload.phone
      state.reward = payload.reward
    },
    updateCustomerName: (state, {payload} : PayloadAction<string>) => {
      state.name = payload;
    },
    updateAddress:(state, {payload} : PayloadAction<IAddress>) => {
      state.address = {
        ...state.address,
        ...payload
      }
    },   
    updateAptBusiness:(state, {payload} : PayloadAction<{ apt: string, business: string}>) => {
      state.address = {
        ...state.address,
        apt: isEmpty(payload.apt) ? state.address.apt : payload.apt,
        business: isEmpty(payload.business) ? state.address.business : payload.business
      }
    },   
  }
})

export default customerSlice.reducer

export const {  
  updateCustomerName,
  addNewPhone,
  updateAddress,
  updateAptBusiness,
  getCustomer,
} = customerSlice.actions

