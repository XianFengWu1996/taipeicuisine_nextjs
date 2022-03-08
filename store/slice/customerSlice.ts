import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define the initial state using that type
const initialState: ICustomer = {
    name: 'Xian Feng Wu',
    phone: '9175787352',
    phone_list: ['9175787352'],
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
    doSomething: (state) => {

    }
  }
})

export default customerSlice.reducer

export const {  
  doSomething
} = customerSlice.actions

