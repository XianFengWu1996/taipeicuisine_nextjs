import axios from "axios";
import { handleCatchError } from "../errors/custom";
import Cookie from 'js-cookie'
import { Dispatch, SetStateAction } from "react";


export const createPaymentIntent = async (setSID?: Dispatch<SetStateAction<string | undefined>>) =>  {
    try {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/create-payment-intent`,
        })

        if(setSID){
            setSID(Cookie.get('s_id'));
        }
    } catch (error) {
      handleCatchError(error as Error, 'Failed to create intent');
    }
}