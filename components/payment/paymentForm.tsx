import { PaymentElement, useStripe, useElements,} from '@stripe/react-stripe-js';
import axios from "axios";
import { token } from "../../utils/functions/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { handleCatchError } from "../../utils/errors/custom";
import snackbar from "../snackbar";
import { Button, Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FaCheck } from 'react-icons/fa';


export const PaymentForm = ({ cards } : {cards: IPublicPaymentMethod[]} ) => {
    const stripe = useStripe();
    const elements = useElements();

    const cartState = useAppSelector(state => state.cart)

    const [isLoading, setIsLoading] = useState(false);
    const [futureUse, setFutureUse] = useState(false);
    const [savedCardForm, setSavedCardForm] = useState(true);

    const inititalCard:IPublicPaymentMethod = {
        card: {
            brand: '',
            last_four: '',
            exp_year: 0,
            exp_month: 0,
        },
        id: ''
    }
    const [selectCard, setSelectedCard] = useState<IPublicPaymentMethod>(inititalCard);

    const toggleFutureUse = (_: ChangeEvent<HTMLInputElement>, checked:boolean) => {
        setFutureUse(checked);
    }

    const toggleSavedCardForm = () => {
        setSavedCardForm(!savedCardForm);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       try {
        e.preventDefault();
    
        if (!stripe || !elements) return;
    
        setIsLoading(true);
        // update the intent before submit the order
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/update-payment-intent`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: {
                total: cartState.total,
                future_use: futureUse
            }
        })
            
        // confirm the payment with stripe
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/order/confirmation`,
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

    return <div style={{ display: 'flex',  justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
        <form id="payment_form" onSubmit={handleSubmit}>
            {
                savedCardForm && cards.length > 0 ?  <>
                 {
                     cards.length > 0 && <>
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
                     </>
                 }
               
                </> : <>
                    <PaymentElement id="payment-element" />
                    <FormControlLabel control={<Checkbox checked={futureUse} onChange={toggleFutureUse} />} label="Save Card for Future" />
                </>
                

            }

            <button disabled={isLoading || !stripe || !elements} id="stripe_button">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now $${cartState.total}`}
                </span>
            </button>

            {
                cards.length > 0 &&  <Button variant="text" sx={{ color: blue[300], my: 1}} onClick={(_) => toggleSavedCardForm()}>{savedCardForm ? 'use a new card' : 'use a saved card'}</Button>
            }
        </form>

 
    </div>
}