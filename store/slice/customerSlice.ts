import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uniq } from 'lodash'

// Define the initial state using that type
const initialState: ICustomer = {
    name: 'Xian Feng Wu',
    phone: '9175787352',
    phone_list: ['9175787352', '7816669666', '1234567890', '9175787352', '7816669666', '1234567890'],
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
    billings: {
        customer_id: '',
        cards: [],
    },
    reward: {
        points: 1300,
        transactions: [],
    },
    loginDialogOpen: false,
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
    // NAME RELATED
    updateCustomerName: (state, {payload} : PayloadAction<string>) => {
      state.name = payload;
    },
    setLoginDialog: (state, {payload}:PayloadAction<boolean>) => {
      state.loginDialogOpen = payload;
    },
    addNewPhone: (state, { payload } : PayloadAction<{phone: string, phone_list: string[]}>) => {
      state.phone = payload.phone
      state.phone_list = payload.phone_list
    },
  }
})

export default customerSlice.reducer

export const {  
  setDefaultPhoneNumber,
  removePhoneNumber,
  updateCustomerName,
  setLoginDialog,
  addNewPhone,
} = customerSlice.actions

