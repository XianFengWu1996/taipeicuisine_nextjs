import { Button, Typography, useMediaQuery } from "@mui/material"
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



export const CustomerDetails = () => {
    const cartState = useAppSelector(state => state.cart)
    const { name, phone } = useAppSelector(state => state.customer)

    const desktop = useMediaQuery('(min-width: 900px)');

    return <div style={{ margin: '40px'}}>

        <PickupOrDelivery />

        {
            !desktop ? <CartSummary /> : null
        }

        <CustomerCard
            title="Customer Information"
            icon={<GrContactInfo />}
            content={<>
                <Typography>Name: { name }</Typography>    
                <Typography>Phone: {phoneFormat(phone)}</Typography>    
            </>}
        />

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

        <ApplyDiscount />

        <AddSpecialComment />

        <IncludeUtensils />

        <PaymentSelection />

        <div>
            <Button 
                variant="contained" 
                sx={{ backgroundColor: '#000', padding: '10px 50px'}}
                disabled={cartState.payment_type !== 'cash' && cartState.payment_type !== 'instore'}
            >Place Order</Button>
        </div>
    </div>
}

