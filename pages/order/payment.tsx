import { PublicAppBar } from "../../components/appbar/appbar";
import Cookie from 'js-cookie'
import { PaymentForm } from "../../components/payment/paymentForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { fbAuth } from "../../utils/functions/auth";
import { handleCatchError } from "../../utils/errors/custom";
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_MQq0KVxKkSLUx0neZbdLTheo00iB1Ru6a0');

export default function PaymentPage () {
    const [showSkeleton, setShowSkeleton] = useState(true);

    const [cards, setCards] = useState<IPublicPaymentMethod[]>([])

    const s_id = Cookie.get('s_id')
    
    useEffect(() => {
       onAuthStateChanged(fbAuth, async user => {
           if(user){
               try {
                    const method = await axios({
                        method: 'GET',
                        url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/get_payment_method`,
                        headers: {
                            'authorization': `Bearer ${await user.getIdToken()}`
                        }
                    })

                    if(method.data.cards){
                        setCards(method.data.cards);
                    }
               } catch (error) {
                    handleCatchError(error as Error, 'Failed to get payment methods')
               } finally {
                setShowSkeleton(false);
               }
           }
       })
    }, [])
    return <>
        <PublicAppBar />
        {
            showSkeleton ? 
                <div>skeleton</div>
            :  <div>
                {
                    s_id && <Elements stripe={stripePromise} options={{
                            clientSecret: s_id,
                            appearance: { theme: 'stripe'}
                    }}>
                    <PaymentForm cards={cards}/>
                    </Elements>
                }
            </div>
            
        }
    </>
}

