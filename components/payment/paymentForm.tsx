import { PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from "axios";
import { token } from "../../utils/functions/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { handleCatchError } from "../../utils/errors/custom";
import snackbar from "../snackbar";
import { Button, Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FaCheck } from 'react-icons/fa';
import Router, { useRouter } from 'next/router';
import { isEmpty, isString } from 'lodash';
import { handlePayWithIntent, handlePayWithMethodId } from '../../utils/functions/payment';


export const PaymentForm = ({ cards } : {cards: IPublicPaymentMethod[]} ) => {

    // redux stores
    const cartState = useAppSelector(state => state.cart);
    const customerState = useAppSelector(state => state.customer);

    // stripe and stripe element
    const stripe = useStripe();
    const elements = useElements();

    // manage the state
    const inititalCard:IPublicPaymentMethod = {
        card: {
            brand: '',
            last_four: '',
            exp_year: 0,
            exp_month: 0,
        },
        id: ''
    }
    const [isLoading, setIsLoading] = useState(false);
    const [futureUse, setFutureUse] = useState(false);
    const [savedCardForm, setSavedCardForm] = useState(cards.length > 0);
    const [selectCard, setSelectedCard] = useState<IPublicPaymentMethod>(inititalCard);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       try {
            if (!stripe || !elements) return;

            e.preventDefault();
            setIsLoading(true);

            // process the payment with a saved card
            if(isString(selectCard.id) && !isEmpty(selectCard.id)){
                await handlePayWithMethodId({ 
                    card: selectCard, 
                    total: cartState.total,
                    cart: cartState,
                    customer: customerState,
                    is_new: !savedCardForm
                });
            } else {
                await handlePayWithIntent({
                    stripe,
                    elements,
                    cart: cartState, 
                    customer: customerState, 
                    future_use: futureUse,
                    is_new: !savedCardForm,
                })  
            }
       } catch (error) {
        handleCatchError(error as Error, 'Payment Failed') 
       } finally {
        setIsLoading(false);
       }
    };

    return <div style={{ display: 'flex',  justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
        <form id="payment_form" onSubmit={handleSubmit}>
            {
                savedCardForm ?  <>
                    <Typography>Saved Card</Typography>
                    {
                        cards.map((card) => {
                            return <Card key={card.id} sx={{ my: 2}} onClick={() => {
                                setSelectedCard(card.id === selectCard.id ? inititalCard : card)
                            }}>
                            <CardContent> 
                                {card.card.brand} xx-{card.card.last_four} exp: {card.card.exp_month} / {card.card.exp_year}  {card.id === selectCard.id && <FaCheck />}
                            </CardContent>
                        </Card>
                        })
                    }
                </> : <>
                    <PaymentElement id="payment-element"/>
                    <FormControlLabel control={<Checkbox checked={futureUse} onChange={(_, checked) => {
                        setFutureUse(checked)
                    }} />} label="Save Card for Future" />
                </>
            }
            <button disabled={isLoading || !stripe || !elements} id="stripe_button">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now $${cartState.total}`}
                </span>
            </button>

            {
                cards.length > 0 &&  <Button variant="text" sx={{ color: blue[300], my: 1}} onClick={(_) => {
                    setSavedCardForm(!savedCardForm);
                    setSelectedCard(inititalCard);
                }}>{savedCardForm ? 'use a new card' : 'use a saved card'}</Button>
            }
        </form>

 
    </div>
}