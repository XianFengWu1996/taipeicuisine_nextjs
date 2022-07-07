import { styled } from '@mui/system';
import {  useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from "react";
import { useAppSelector } from "../../store/store";
import { NewPaymentForm } from './newPayment';
import { SavedPaymentForm } from './savedPayment';

export const PaymentFormContainer = styled('form')(({ theme }) => ({
    width: '40vw',
    minWidth: '400px',
    alignSelf: 'center',
    boxShadow: '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius: '7px',
    padding: '40px',

    [theme.breakpoints.down('lg')]: {
        width: '60vw',
    },

    [theme.breakpoints.down('md')]: {
        width: '90%',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '0px',
        boxShadow: 'none'
    }
}))

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

    return <div style={{ display: 'flex',  justifyContent: 'space-around', alignItems: 'center', width: '100%',marginTop: 20}}>
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



