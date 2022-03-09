import { createSlice, PayloadAction } from '@reduxjs/toolkit'


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
    }, 
    billings: {
        customer_id: '',
        cards: [],
    },
    reward: {
        points: 0,
        transactions: [],
    }
}   

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // PHONE RELATED 
    setDefaultPhoneNumber: (state, {payload} : PayloadAction<string>) => {
      state.phone = payload;

      let index = state.phone_list.findIndex(phone  => phone === payload);
      state.phone_list.splice(index, 1);
      state.phone_list.unshift(payload);
    },
  }
})

export default customerSlice.reducer

export const {  
  setDefaultPhoneNumber,
} = customerSlice.actions

