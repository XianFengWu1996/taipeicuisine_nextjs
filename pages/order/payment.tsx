import { PublicAppBar } from "../../components/appbar/appbar";

import { PaymentElement, useStripe, useElements,} from '@stripe/react-stripe-js';
import axios from "axios";
import { token } from "../../utils/functions/auth";
import { FormEvent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { handleCatchError } from "../../utils/errors/custom";
import snackbar from "../../components/snackbar";


export default function PaymentPage () {
    return <>
        <PublicAppBar />
        <CheckoutForm />
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
                {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now $${cartState.total}`}
                </span>
            </button>
        </form>
    </div>
}