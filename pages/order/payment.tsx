import { PublicAppBar } from "../../components/appbar/appbar";
import Cookie from 'js-cookie'
import { PaymentForm } from "../../components/payment/paymentForm";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../../utils/functions/auth";
import { handleCatchError, NotAuthorizeError } from "../../utils/errors/custom";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Skeleton } from "@mui/material";
import { handleGetPaymentList } from "../../utils/functions/payment";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAllowPayment } from "../../store/slice/settingSlice";


const stripePromise = loadStripe('pk_test_MQq0KVxKkSLUx0neZbdLTheo00iB1Ru6a0');

export default function PaymentPage () {
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { allow_payment_page } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch();

    const [cards, setCards] = useState<IPublicPaymentMethod[]>([])

    const s_id = Cookie.get('s_id')
    
    useEffect(() => {
       

       onAuthStateChanged(fbAuth, async user => {  
        try {
            if(!user){
                throw new NotAuthorizeError
            }
    
             // only allow the payment if it is from checkout page route 
             if(!allow_payment_page){
                return Router.replace('/order/checkout')
            }

            await handleGetPaymentList(await user.getIdToken(), setCards)
        } catch (error) {
            handleCatchError(error as Error, 'Failed to get payment methods')
        } finally {
            setShowSkeleton(false);
        }
       })

       return () => {
            dispatch(setAllowPayment(false))
       }
    }, [allow_payment_page, dispatch])
    return <>
        <PublicAppBar />
        {
            showSkeleton ? 
                <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Skeleton   
                        variant="rectangular"
                        height={600} 
                        width={350}
                        sx={{ marginY: 1}} 
                    />
                </div>
             
            :  <div>
                {
                    s_id && <Elements stripe={stripePromise} options={{
                            clientSecret: s_id,
                            appearance: { theme: 'stripe', }
                    }}>
                    <PaymentForm cards={cards}/>
                    </Elements>
                }
            </div>
            
        }
    </>
}

