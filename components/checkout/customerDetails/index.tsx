import { Button, useMediaQuery } from "@mui/material"
import { PickupOrDelivery } from "./pickupButton/pickupOrDelivery"
import { CustomerCard } from "./customerInfo/customerCard"
import { PaymentSelection } from "./payment/paymentSelection"
import {  useAppSelector } from "../../../store/store"
import { AddSpecialComment } from "./comment/addSpecialComment"
import { ApplyDiscount } from "./discount/applyDiscount"
import { IncludeUtensils } from "./utensil/includeUtensils"
import { CartSummary } from "../cartSummary"
import { styled } from "@mui/system"
import { AddressCard } from "./address/deliveryCard"
import { handleCatchError } from "../../../utils/errors/custom"
import Router from "next/router"
import axios from "axios"
import { token } from "../../../utils/functions/auth"
import snackbar from "../../snackbar"
import { isEmpty } from "lodash"


const CheckoutContainer = styled('div')(({ theme }) => ({
    margin: '40px',

    [theme.breakpoints.down('md')]: {
        margin: '25px',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '15px',
    },
}))

export const CustomerDetails = () => {

    const cartState = useAppSelector(state => state.cart)
    const customerState = useAppSelector(state => state.customer)


    const desktop = useMediaQuery('(min-width: 900px)');

    const handlePlaceOrder = async () => {
        // TWO MAIN THINGS TO CHECK BEFORE PROCEEDING
        // IF THE CART IS EMPTY OR NOT
        // IF PICKUP, 
        // - REQUIRE CUSTOMER INFO (NAME AND PHONE)

        // IF DELIVERY
        // - REQUIRE CUSTOMER INFO (NAME AND PHONE)
        // - MINIMUM FOR DELIVERY
        // - REQUIRED THE ADDRESS AND DELIVERY FEE
        if(cartState.cart.length === 0){
            return snackbar.error('Add item before proceeding')
        }

        if(!customerState.name){
            return snackbar.error('Add name before proceeding')
        }

        if(!customerState.phone){
            return snackbar.error('Add phone before proceeding')
        }

        if(cartState.is_delivery){
            if(cartState.subtotal < 15){
                return snackbar.error('Minimum for delivery is $15 (subtotal)')
            }

            if(!customerState.address.address){
                return snackbar.error('Make sure to have an valid address')
            }

            if(!cartState.delivery_fee || cartState.delivery_fee === 0){
                return snackbar.error('Please try to search the address again')
            }
        }

        if(isEmpty(cartState.payment_type)){
            return snackbar.error('Please select a payment method')
        }
     

        try {
            // head to the payment page for online payments
            if(cartState.payment_type === 'online'){
                // return Router.push('/order/payment')
                console.log('go to payment page')

            }

            // process the order
            // let response = await axios({
            //     method: 'POST',
            //     url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_order`,
            //     headers: { 'authorization': `Bearer ${await token()}`},
            //     data: {
            //         cart: cartState,
            //         customer: customerState,
            //     }
            // })

            // Router.push(`/order/confirmation?order_id=${response.data.order_id}`)
            console.log('process')


        } catch (error) {
            handleCatchError(error as Error, 'Failed to place order');
        }
    }

    return <CheckoutContainer>
        <PickupOrDelivery /> 

        { !desktop && <CartSummary />  }

        <CustomerCard />
        
        { cartState.is_delivery && <AddressCard />  }

        <ApplyDiscount />

        <AddSpecialComment />

        <IncludeUtensils />

        <PaymentSelection />

        <Button 
            variant="contained" 
            sx={{ backgroundColor: '#000', padding: '10px 50px'}}
            onClick={handlePlaceOrder}

        >Place Order</Button>
    </CheckoutContainer>
}

