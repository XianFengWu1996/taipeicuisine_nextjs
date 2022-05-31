import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uniq } from 'lodash'

// Define the initial state using that type
const initialState: ICustomer  = {
    name: '',
    phone: '',
    phone_list: [],
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

const handleDuplicatePhoneNum = (state: ICustomer, list: string[]) => {
  let hasDup = uniq(list).length !== list.length;

  if(hasDup){
    let newArr = Array.from(new Set(list));

    state.phone_list = newArr;
  }
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // PHONE RELATED 
    setDefaultPhoneNumber: (state, {payload} : PayloadAction<string>) => {
      handleDuplicatePhoneNum(state, state.phone_list)
      state.phone = payload;
      let index = state.phone_list.findIndex(phone  => phone === payload);
      state.phone_list.splice(index, 1);
      state.phone_list.unshift(payload);
    },
    removePhoneNumber: (state, {payload} : PayloadAction<string>) => {
      handleDuplicatePhoneNum(state, state.phone_list)
      let index = state.phone_list.findIndex(phone  => phone === payload);
      state.phone_list.splice(index, 1);
    },
    addNewPhone: (state, { payload } : PayloadAction<{phone: string, phone_list: string[]}>) => {
      state.phone = payload.phone
      state.phone_list = payload.phone_list
    },
    // NAME RELATED
    getCustomer: (state, {payload} : PayloadAction<ICustomer>) => {
      state.address = { ... payload.address }
      state.name = payload.name
      state.phone = payload.phone
      state.phone_list = payload.phone_list
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
  }
})

export default customerSlice.reducer

export const {  
  setDefaultPhoneNumber,
  removePhoneNumber,
  updateCustomerName,
  addNewPhone,
  updateAddress,
  getCustomer,
} = customerSlice.actions

