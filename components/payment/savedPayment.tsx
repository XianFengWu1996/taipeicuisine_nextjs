import { Button, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Stripe, StripeElements} from '@stripe/stripe-js'
import { isEmpty } from 'lodash';
import { FormEvent, useState } from 'react';
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
      const [isLoading, setIsLoading] = useState(false);
      const [value, setValue] = useState<string>('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            if (!stripe || !elements) return;

            e.preventDefault();
            setIsLoading(true);

            let found_card = cards.find(card => card.id === value);

            if(!found_card){
                throw new Error('Please select a card to proceed')
            }

            if(cart.is_delivery){
                if(isEmpty(cart.tip_type)){
                    throw new Error('Please select tip for your driver')
                }
            }
           
            await handlePayWithMethodId({ 
                card: found_card, 
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
            <FormControl sx={{ width: '100%'}}>
                <RadioGroup value={value} onChange={(e) => {
                    setValue(e.target.value);               
                }}>   
                    {
                        cards.map((card) => {
                            return <Card key={card.id} sx={{ my:1}}>
                            <CardContent sx={{ padding: '13px !important'}}> 
                                <FormControlLabel value={card.id} control={<Radio />} sx={{ marginLeft: 0}} label={
                                    <Box sx={{  display: 'flex', alignItems: 'center'}}>
                                        <div style={{ marginLeft: '5px', display: 'flex', justifyContent: 'space-between'}}>{handleCreditCardBrand(card.card.brand)}</div>
                                        <Typography sx={{ mx: 2, fontWeight: 500}}>{card.card.brand === 'amex' ? `•••• •••••• •${card.card.last_four}` : `•••• •••• •••• ${card.card.last_four}`}</Typography>
                                        <Typography sx={{ fontWeight: 500}}>EXP:{card.card.exp_month} / {card.card.exp_year}</Typography>
                                    </Box>
                                } />             
                            </CardContent>
               
                        </Card>
                        })
                    }
                </RadioGroup>
            </FormControl>
           

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