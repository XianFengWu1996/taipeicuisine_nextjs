import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: IStore = {
    hours: {
        regular_hour: [],
        special_hour: [],
    },
    message: {} as IMessage,
    server_is_on: true,
    store_summary: {
        name: '',
        primary_phone_number: '',
        sub_phone_number: [], 
        address:{} as IAddress
   }
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    retrieveStoreData: (state, {payload}:PayloadAction<IStore>) => {
        return state = {
            ...state, 
            ...payload
        }
    },
    }
})

export default storeSlice.reducer

export const {  
    retrieveStoreData
} = storeSlice.actions
