import { Button, Skeleton, Typography, useMediaQuery } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"
import {  useAppSelector } from "../../../../store/store"
import { AddSpecialComment } from "./AddSpecialComment"
import { ApplyDiscount } from "./ApplyDiscount"
import { IncludeUtensils } from "./includeUtensils"
import { phoneFormat } from "../../../../utils/functions/phone"
import { CartSummary } from "../cartSummary"
import { app, fbAuth } from "../../../../utils/functions/auth"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useState } from "react"



export const CustomerDetails = () => {
    const cartState = useAppSelector(state => state.cart)
    const { name, phone } = useAppSelector(state => state.customer)

    const desktop = useMediaQuery('(min-width: 900px)');

    const [ user, setUser ] = useState<User | null>();

    onAuthStateChanged(fbAuth, fbUser => {
        setUser(fbUser);
    })


    return <div style={{ margin: '40px'}}>

        {
            user ? <PickupOrDelivery /> : <Skeleton style={{ height: '100px'}}/>
        }

        {
            !desktop ? 
            // <CartSummary /> 
                user ? <CartSummary />  : <Skeleton height={'325px'}  style={{ lineHeight: 0 }}/>
            : null
        }

       {
           user ? <CustomerCard
                title="Customer Information"
                icon={<GrContactInfo />}
                content={<>
                    <Typography>Name: { name }</Typography>    
                    <Typography>Phone: {phoneFormat(phone)}</Typography>    
                </>}
            /> : <Skeleton height={'185px'}  style={{ lineHeight: 0 }}/>
        }
        
        {
            cartState.is_delivery ? <CustomerCard 
                title="Delivery Address"
                icon={<BiBuildingHouse />}
                content={<>
                    <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                    <Typography>Apt: 1022</Typography>
                    <Typography>Business: Taipei Cuisine</Typography>   
                </>}
            /> : null
        }

        {
            user ? <>
                <ApplyDiscount />

                <AddSpecialComment />

                <IncludeUtensils />

                <PaymentSelection />

            </> : <Skeleton height={300}  style={{ lineHeight: 1 }}/>
        }

    
        <div>
            <Button 
                variant="contained" 
                sx={{ backgroundColor: '#000', padding: '10px 50px'}}
                disabled={cartState.payment_type !== 'cash' && cartState.payment_type !== 'instore'}
            >Place Order</Button>
        </div>
    </div>
}

