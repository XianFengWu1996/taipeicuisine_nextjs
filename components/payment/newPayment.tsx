import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Stripe, StripeElements} from '@stripe/stripe-js'
import { isEmpty } from 'lodash';
import { FormEvent, useState } from 'react';
import { handleCatchError } from '../../utils/errors/custom';
import { handlePayWithIntent } from '../../utils/functions/payment';
import { TipSelection } from '../checkout/customerDetails/tipSelection';
import { PaymentElement } from '@stripe/react-stripe-js';



interface INewPaymentFormProps {
    cards: IPublicPaymentMethod [],
    cart: ICartState,
    customer: ICustomerState,
    stripe: Stripe | null,
    elements: StripeElements | null,
    toggleForm: () => void
}

export const NewPaymentForm = ({cards, cart, customer, stripe, elements, toggleForm}:INewPaymentFormProps) => {  
      const [isLoading, setIsLoading] = useState(false);
      const [futureUse, setFutureUse] = useState(false);
      const [allowSave, setAllowSave] = useState(false);

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
             if (!stripe || !elements) return;
 
             e.preventDefault();
             setIsLoading(true);

            if(cart.is_delivery){
                if(isEmpty(cart.tip_type)){
                    throw new Error('Please select a tip')
                }
            }
            
             // process the payment with a saved card
             await handlePayWithIntent({
                stripe,
                elements,
                cart, 
                customer, 
                future_use: futureUse,
                is_new: true,
            }) 
        } catch (error) {
         handleCatchError(error as Error, 'Payment Failed') 
        } finally {
         setIsLoading(false);
        }
     };

    return <>
        <form id="payment_form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" 
                onChange={(e) => {
                    setAllowSave(e.value.type === 'card');
                    setFutureUse(false);
                }}
            />
            {
                allowSave && <FormControlLabel control={<Checkbox checked={futureUse} onChange={(_, checked) => {
                    setFutureUse(checked)
                }} />} label="I want to save this card for future purchase" />
            }

            <TipSelection />

            <button disabled={isLoading || !stripe || !elements} id="stripe_button">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now $${cart.total.toFixed(2)}`}
                </span>
            </button>
        
            {
                cards.length > 0 &&  
                <Button variant="text" sx={{ color: blue[300], my: 1}} onClick={toggleForm}>
                    use a saved card
                </Button>
            }
        </form>
    </>
}