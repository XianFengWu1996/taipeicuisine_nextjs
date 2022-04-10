import { Button } from "@mui/material";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { isString } from "lodash";
import Router, { useRouter } from "next/router";
import { useEffect } from "react"
import { orderComplete } from "../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { handleCatchError } from "../../utils/errors/custom";
import { fbAuth } from "../../utils/functions/auth";

export default function Confirmation () {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const cartState = useAppSelector(state => state.cart);
    const customerState = useAppSelector(state => state.customer);

    // useEffect(() => {
    //     if(router.isReady){
    //         if(cartState.cart.length < 0) return;

    //         console.log('ran')

    //         onAuthStateChanged(fbAuth, async user => {
    //             if(!user) return;

    //             if(!isString(router.query.payment_intent) || !isString(router.query.redirect_status)){
    //                 // error message or something
    //             }
    
    //             // if payment is successful
    //             if(router.query.redirect_status === 'succeeded'){
    //                    // submit the order our backend
    //                     try {
    //                         await axios({
    //                             method: 'POST',
    //                             url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_online_order`,
    //                             headers: { 'Authorization': `Bearer ${await user.getIdToken()}`},
    //                             data: { 
    //                                 cart: cartState,
    //                                 customer: {
    //                                     name: customerState.name,
    //                                     phone: customerState.phone,
    //                                     address: customerState.address
    //                                 },
    //                                 payment_intent: router.query.payment_intent,
    //                                 is_new: router.query.is_new ? true : false
    //                             }
    //                         })
    //                         dispatch(orderComplete())
    //                     } catch (error) {
    //                         handleCatchError((error as Error), 'Failed to place order')
    //                     }
    //             }
               
    //         })
    //     }
    // }, [router.isReady])

    return <>
        confirmation

        <Button onClick={() => {
            Router.push('/order')
        }}>Return to Home</Button>
    </>
}