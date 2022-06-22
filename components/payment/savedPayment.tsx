import { Button, Card, CardContent, Radio, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Stripe, StripeElements} from '@stripe/stripe-js'
import { isEmpty, isString } from 'lodash';
import { FormEvent, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { handleCatchError } from '../../utils/errors/custom';
import { handlePayWithMethodId } from '../../utils/functions/payment';
import { handleCreditCardBrand } from '../history/orderPayment';
import { TipSelection } from './tipSelection';


interface ISavePaymentFormProps {
    cards: IPublicPaymentMethod [],
    cart: ICartState,
    customer: ICustomer,
    stripe: Stripe | null,
    elements: StripeElements | null,
    toggleForm: () => void
}

export const SavedPaymentForm = ({ cards, cart, customer, stripe, elements, toggleForm }: ISavePaymentFormProps) => {
    // manage the initial state
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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            if (!stripe || !elements) return;

            e.preventDefault();
            setIsLoading(true);
 
            // process the payment with a saved card
            if(!isString(selectCard.id) || isEmpty(selectCard.id)){
               throw new Error('Please select a card to proceed')
            }

            if(cart.is_delivery){
                if(isEmpty(cart.tip_type)){
                    throw new Error('Please select tip for your driver')
                }
            }

            await handlePayWithMethodId({ 
                card: selectCard, 
                cart,
                customer,
            });
        } catch (error) {
         handleCatchError(error as Error, 'Payment Failed') 
        } finally {
         setIsLoading(false);
        }
     };

    return <>
        <form id="payment_form" onSubmit={handleSubmit}>
            <Typography>Saved Card</Typography>
            {
                cards.map((card) => {
                    return <Card key={card.id} sx={{ my: 2}} onClick={() => {
                        setSelectedCard(card.id === selectCard.id ? inititalCard : card)
                    }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '8px !important'}}> 
                        <Radio />
                        <div>{handleCreditCardBrand(card.card.brand)}</div>
                        <Typography sx={{ mx: 2, fontWeight: 500}}>{card.card.brand === 'amex' ? `•••• •••••• •${card.card.last_four}` : `•••• •••• •••• ${card.card.last_four}`}</Typography>
                        <Typography sx={{ fontWeight: 500}}>EXP:{card.card.exp_month} / {card.card.exp_year}</Typography>
                           {/* {card.id === selectCard.id && <FaCheck />} */}
                    </CardContent>
                </Card>
                })
            }

            <TipSelection />

            <button disabled={isLoading || !stripe || !elements} id="stripe_button">
                <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : `Pay Now $${cart.total.toFixed(2)}`}
                </span>
            </button>       

            <Button variant="text" sx={{ color: blue[300], my: 1}} onClick={toggleForm}>Use a new card</Button>            
        </form>
    </>
}