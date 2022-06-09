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
import { useState } from "react"
import { BeatLoader } from "react-spinners"


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
    const [loading, setLoading] = useState<boolean>(false)

    const cartState = useAppSelector(state => state.cart)
    const customerState = useAppSelector(state => state.customer)
    const dispatch = useAppDispatch();


    const desktop = useMediaQuery('(min-width: 900px)');

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);

            if(!loading){
                validateToPlaceOrder(cartState, customerState);
                // head to the payment page for online payments
                if(cartState.payment_type === 'online'){
                    await handleOnlineOrder(cartState, customerState);
                } else {
                    await handleInStoreOrCashOrder(cartState, customerState)
                }
                dispatch(setAllowPayment(true))
            }
            
        } catch (error) {
            handleCatchError(error as Error, 'Failed to place order');
        } finally {
            setLoading(false);
        }
    }

    const handleButtonDisplay = () => {
        if(loading){
            return <BeatLoader color="white" size={7} />
        }

        if(cartState.payment_type === 'online'){
            return 'Proceed to Payment'
        } else {
            return 'Place Order'
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
        >
            {handleButtonDisplay()}
            {/* {} */}
            </Button>
    </CheckoutContainer>
}

