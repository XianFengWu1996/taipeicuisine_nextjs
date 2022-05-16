import { Button, useMediaQuery } from "@mui/material"
import { PickupOrDelivery } from "./pickupButton/pickupOrDelivery"
import { CustomerCard } from "./customerInfo/customerCard"
import { PaymentSelection } from "./payment/paymentSelection"
import {  useAppDispatch, useAppSelector } from "../../../store/store"
import { AddSpecialComment } from "./comment/addSpecialComment"
import { ApplyDiscount } from "./discount/applyDiscount"
import { IncludeUtensils } from "./utensil/includeUtensils"
import { CartSummary } from "../cartSummary"
import { styled } from "@mui/system"
import { AddressCard } from "./address/deliveryCard"
import { handleCatchError } from "../../../utils/errors/custom"
import { PickupTime } from "./pickupTime/pickupTime"
import { handleInStoreOrCashOrder, handleOnlineOrder, validateToPlaceOrder } from "../../../utils/functions/payment"
import { setAllowPayment } from "../../../store/slice/settingSlice"


const CheckoutContainer = styled('div')(({ theme }) => ({
    margin: '40px',

    [theme.breakpoints.down('md')]: {
        margin: '25px',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '15px',
    },
}))

const UtensilPickUpTimeContainer = styled('div')(({ theme }) => ({
    display: 'flex', 
    justifyContent: 'space-between',

    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column'
    },
}))

export const CustomerDetails = () => {

    const cartState = useAppSelector(state => state.cart)
    const customerState = useAppSelector(state => state.customer)
    const dispatch = useAppDispatch();


    const desktop = useMediaQuery('(min-width: 900px)');

    const handlePlaceOrder = async () => {
        try {
            validateToPlaceOrder(cartState, customerState);
            // head to the payment page for online payments
            if(cartState.payment_type === 'online'){
                await handleOnlineOrder(cartState, customerState);
            } else {
                await handleInStoreOrCashOrder(cartState, customerState)
            }
            dispatch(setAllowPayment(true))
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

        <UtensilPickUpTimeContainer>
            <IncludeUtensils />
            <PickupTime />
        </UtensilPickUpTimeContainer>

        <PaymentSelection />

        <Button 
            variant="contained" 
            sx={{ backgroundColor: '#000', padding: '10px 50px'}}
            onClick={handlePlaceOrder}

        >{cartState.payment_type === 'online' ? 'Proceed to Payment' : 'Place Order'}</Button>
    </CheckoutContainer>
}

