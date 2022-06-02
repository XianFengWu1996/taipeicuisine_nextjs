import { isEmpty } from "lodash"
import snackbar from "../../components/snackbar"
import validator from "validator"
import axios from "axios"
import { handleAxiosError } from "../errors/handleAxiosError"
import { fbAuth, token } from "./auth"
import Cookies from "js-cookie"
import { addNewPhone, updateAddress } from "../../store/slice/customerSlice"
import { setShowAddressCard, setShowCustomerCard, setShowSmsDialog } from '../../store/slice/settingSlice'
import { store } from '../../store/store'
import { handleCatchError } from "../errors/custom"
import { setDelivery } from "../../store/slice/cartSlice"

export const phoneFormat = (phone: string) => {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
}

export const sentCode = async ({ phone, handleStartLoading} : ISentCode) => {
    if(isEmpty(phone)){
       return snackbar.error('Phone number is required.')
    }

    if(!validator.isMobilePhone(phone, "en-US")){
        return snackbar.error("Please enter a valid us phone number.")
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

export const handleCodeVerify = async (code: string) => {
    if(!Cookies.get('c_id')){
        return snackbar.warning('The code has expired, please request another code')
    }

    try {
        snackbar.info("Verify in progress...")
        
        let response = await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/verify`, {
            code, 
        }, {
            headers: {
                'Authorization': `Bearer ${await fbAuth.currentUser?.getIdToken()}`
            }
        });

        store.dispatch(addNewPhone({
            phone: response.data.phone,
        }))

        store.dispatch(setShowCustomerCard(false));
        store.dispatch(setShowSmsDialog(false));
        snackbar.success('New phone number has been verified');        
    } catch (error) {
        if(axios.isAxiosError(error)){
           return handleAxiosError(error);
        }
        snackbar.error('Something unexpected happen, try refresh the page')
    }
}

export const calculateDeliveryFee = async(data: ICalcDelivFee) => {
       let address_result = await axios({
            method: 'POST',
            url:`${process.env.NEXT_PUBLIC_CF_URL}/auth/address/delivery`,
            headers: {
                'Authorization': `Bearer ${await token()}`
            },
            data: {
                format_address: data.format_address,
                address: {
                    street: `${data.address.street_number} ${data.address.route}`,
                    city: data.address.locality,
                    state: data.address.administrative_area_level_1,
                    zipcode: data.address.postal_code
                },
                place_id: data.place_id
            }
        })

        return {
            address: address_result.data.address as IAddress,
        }
}