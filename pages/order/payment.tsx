import { PublicAppBar } from "../../components/appbar/appbar";

import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from "axios";
import { fbAuth, token } from "../../utils/functions/auth";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { onAuthStateChanged,  } from "firebase/auth";
import Cookie from 'js-cookie'
import { handleCatchError } from "../../utils/errors/custom";
import snackbar from "../../components/snackbar";

const stripePromise = loadStripe('pk_test_MQq0KVxKkSLUx0neZbdLTheo00iB1Ru6a0');

export default function PaymentPage () {
    const { total } = useAppSelector(state => state.cart)

    const s_id = Cookie.get('s_id');

     const createPaymentIntent = async (token: string) =>  {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/create-payment-intent`,
                    headers: {  "authorization": `Bearer ${token}`},
                    data: { total }
                })
            } catch (error) {
                handleCatchError(error as Error, 'Failed to create intent');
            }
        }

    useEffect(() => {
        
        const listener = onAuthStateChanged(fbAuth, async (user) => {
            if(user){
                // only create a payment if s_id is undefine or null
                if(!s_id){
                    createPaymentIntent(await user.getIdToken())
                }
            }
        });

        return () => listener()
    }, [])
    
    

    return <>
        <PublicAppBar />

        {
            s_id && <Elements stripe={stripePromise} options={{
                clientSecret: s_id,
                appearance: { theme: 'stripe'}
            }}>
                <CheckoutForm />
            </Elements>
        }
    </>
}

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const cartState = useAppSelector(state => state.cart)
    const customerState = useAppSelector(state => state.customer)


    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       try {
        e.preventDefault();
    
        if (!stripe || !elements) return;
    
        setIsLoading(true);

        // submit the order our backend
        let result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/confirm`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                cart: cartState,
                customer: customerState,
            }
        })
        
        // confirm the payment with stripe
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/order/confirmation?order_id=${result.data.order_id} `,
          },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            snackbar.error(error.message ?? "An unexpected error occured.");
        }
    
       } catch (error) {
          handleCatchError(error as Error, 'Payment Failed') 
       } finally {
        setIsLoading(false);
       }
      };

    return <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            
        <form id="payment_form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="stripe_button">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
        </form>
    </div>
}