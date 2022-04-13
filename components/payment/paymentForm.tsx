import {  useStripe, useElements} from '@stripe/react-stripe-js';
import {  useState } from "react";
import { useAppSelector } from "../../store/store";
import { NewPaymentForm } from './newPayment';
import { SavedPaymentForm } from './savedPayment';


export const PaymentForm = ({ cards } : {cards: IPublicPaymentMethod[]} ) => {
    // redux stores
    const cartState = useAppSelector(state => state.cart);
    const customerState = useAppSelector(state => state.customer);

    // stripe and stripe element
    const stripe = useStripe();
    const elements = useElements();

    const [savedCardForm, setSavedCardForm] = useState(cards.length > 0);

    const toggleForm = () => {
        setSavedCardForm(!savedCardForm);
    }

    return <div style={{ display: 'flex',  justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
        {
            savedCardForm 
                ? <SavedPaymentForm
                    cards={cards} 
                    cart={cartState}
                    customer={customerState}
                    stripe={stripe}
                    elements={elements}
                    toggleForm={toggleForm}
                /> 
                : <NewPaymentForm
                    cards={cards} 
                    cart={cartState}
                    customer={customerState}
                    stripe={stripe}
                    elements={elements}
                    toggleForm={toggleForm}
                />
        }
    </div>
}



