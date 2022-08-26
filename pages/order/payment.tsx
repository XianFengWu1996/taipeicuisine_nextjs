import { PublicAppBar } from "../../components/navigation/appbar/appbar";
import Cookie from 'js-cookie'
import { PaymentForm } from "../../components/payment/paymentForm";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../../utils/functions/auth";
import { handleCatchError } from "../../utils/errors/custom";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Skeleton } from "@mui/material";
import { handleGetPaymentList } from "../../utils/functions/payment";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAllowPayment } from "../../store/slice/settingSlice";
import { NotAuthorizeError } from "../../utils/errors/notAuthError";
import { isEmailVerified } from "../email_verification";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

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
                throw new NotAuthorizeError();
            }

            if(!isEmailVerified(user)){
                return Router.replace('/email_verification')
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
                        width={500}
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

