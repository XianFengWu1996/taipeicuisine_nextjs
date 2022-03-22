import { isEmpty } from "lodash"
import snackbar from "../../components/snackbar"
import validator from "validator"
import axios from "axios"
import { handleAxiosError } from "../errors/handleAxiosError"
import { fbAuth } from "./auth"
import Cookies from "js-cookie"
import { addNewPhone, removePhoneNumber, setCustomerCollapse, setDefaultPhoneNumber, updateCustomerName } from "../../store/slice/customerSlice"
import { store } from '../../store/store'
import { handleCatchError } from "../errors/custom"

export const phoneFormat = (phone: string) => {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
}

interface ISentCode {
    phone: string,
    phone_list: string[],
    handleStartLoading: () => void
}

export const sentCode = async ({ phone, phone_list, handleStartLoading} : ISentCode) => {
    if(isEmpty(phone)){
       return snackbar.error('Phone number is required.')
    }

    if(!validator.isMobilePhone(phone, "en-US")){
        return snackbar.error("Please enter a valid us phone number.")
    }

    if(phone_list.includes(phone)){
        return snackbar.info("The number has already been verified.")
    }

    try {
        const fb_token = await fbAuth.currentUser?.getIdToken();
            
        snackbar.info('The code will be sent momentarily')
        await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/send`, {phone}, {
            headers: {
                'Authorization': `Bearer ${fb_token}`
            }
        })
        handleStartLoading();
        snackbar.success('Verification code has been sent.')
    } catch (error) {
        if(axios.isAxiosError(error)){
            return handleAxiosError(error);
        }
        snackbar.error('Unable to send code, please try again later')
    }
}

interface IHandleCodeVerify {
    value: string, 
    handleSmsComplete: () => void
}
export const handleCodeVerify = async ({ value, handleSmsComplete}: IHandleCodeVerify) => {
    if(!Cookies.get('c_id')){
        return snackbar.warning('The code has expired, please request another code')
    }

    try {
        let fb_token = await fbAuth.currentUser?.getIdToken();

        let response = await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/verify`, {
            code: value, 
        }, {
            headers: {
                'Authorization': `Bearer ${fb_token}`
            }
        });

        store.dispatch(addNewPhone({
            phone: response.data.phone,
            phone_list: response.data.phone_list
        }))

        handleSmsComplete();
        
    } catch (error) {
        if(axios.isAxiosError(error)){
           return handleAxiosError(error);
        }
        snackbar.error('Something unexpected happen, try refresh the page')
    }
}

export const selectDefaultPhone = async (phone: string) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/phone`, { phone }, {
            headers: {
                'authorization': `Bearer ${await fbAuth.currentUser?.getIdToken()}`
            }
        })
        store.dispatch(setDefaultPhoneNumber(phone));
        store.dispatch(setCustomerCollapse(false));

        snackbar.success('Phone has been select as default')
    } catch (error) {
        handleCatchError(error as Error, 'Unable to change phone number at the moment');
    }
}

export const removePhoneNum =  async (phone: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/phone`, {
            data: { phone }, 
            headers: {
                'authorization': `Bearer ${await fbAuth.currentUser?.getIdToken()}`
            }
        })

        store.dispatch(removePhoneNumber(phone))
        snackbar.warning('Phone removed')
    } catch (error) {
        handleCatchError(error as Error, 'Failed to remove phone number');
    }
}

export const updateName = async(name: string) => {
    const { customer } = store.getState();

    // if the no change was made, close the collapse card
    if(customer.name === name){
       return store.dispatch(setCustomerCollapse(false));
    }

    try {
        await axios.patch(`${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/name`, { name }, {
            headers: {
                'Authorization': `Bearer ${await fbAuth.currentUser?.getIdToken()}` 
            }
        })

        store.dispatch(updateCustomerName(name));
        snackbar.success('Name has been updated');
        store.dispatch(setCustomerCollapse(false));

    } catch (error) {
        handleCatchError(error as Error, 'Failed to update name');
    }
}
