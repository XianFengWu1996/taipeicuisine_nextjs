import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uniq } from 'lodash'


interface ICustomerState extends ICustomer{
  loginDialogOpen: boolean, // handle status for the login dialog
  customerCollapse: boolean // handle the status of showing hidden option of customer card
  smsDialogOpen: boolean, // handle status for the sms verification dialog
  customerSaveLoading: boolean, // handle loading for the save button in customer card
  customerCardLoading: boolean,
  addressCollapse: boolean,
}
// Define the initial state using that type
const initialState: ICustomerState  = {
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
    reward: {
        points: 1300,
        transactions: [],
    },
    loginDialogOpen: false,
    customerCollapse: false,
    smsDialogOpen: false,
    customerSaveLoading: false,
    customerCardLoading: false,
    addressCollapse: false,
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
    updateCustomerName: (state, {payload} : PayloadAction<string>) => {
      state.name = payload;
    },
   
    // STATES RELATD
    setLoginDialog: (state, {payload}:PayloadAction<boolean>) => {
      state.loginDialogOpen = payload;
    },
    setCustomerCollapse: (state, {payload}:PayloadAction<boolean>) => {
      state.customerCollapse = payload;
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
    }
    
  }
})

export default customerSlice.reducer

export const {  
  setDefaultPhoneNumber,
  removePhoneNumber,
  updateCustomerName,
  addNewPhone,
  setCustomerCollapse,
  setLoginDialog,
  setSmsDialog,
  setCustomerSaveLoading,
  setCustomerCardLoading,
  setAddressCollapse,
} = customerSlice.actions

