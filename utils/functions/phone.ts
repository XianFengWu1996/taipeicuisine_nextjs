import { isEmpty } from "lodash"
import snackbar from "../../components/snackbar"
import validator from "validator"
import axios from "axios"
import { handleAxiosError } from "../errors/handleAxiosError"
import { fbAuth } from "./auth"
import Cookies from "js-cookie"

export const phoneFormat = (phone: string) => {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
}

export const sentCode = async (phone: string, phone_list: string[], handleStartLoading: () => void) => {
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
            
        await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/send`, {
            phone_number: phone
        }, {
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

export const handleCodeVerify = async (value: string) => {
    if(!Cookies.get('c_id')){
        return snackbar.warning('The code has expired, please request another code')
    }

    try {
        let fb_token = await fbAuth.currentUser?.getIdToken();

        await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/verify`, {
            code: value, 
        }, {
            headers: {
                'Authorization': `Bearer ${fb_token}`
            }
        });

        snackbar.success('Phone number has been verified');
    } catch (error) {
        if(axios.isAxiosError(error)){
           return handleAxiosError(error);
        }
        snackbar.error('Something unexpected happen, try refresh the page')
    }
}
