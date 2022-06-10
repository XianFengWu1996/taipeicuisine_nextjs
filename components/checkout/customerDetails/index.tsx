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
import snackbar from "../../snackbar"
import { hasExpired } from "../../../utils/functions/time"
import { format } from "date-fns"
import { fetchMenu } from "../../../utils/functions/menu"


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
    const { menus, expiration } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();


    const desktop = useMediaQuery('(min-width: 900px)');

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);

            if(hasExpired(expiration)){
                console.log(hasExpired(expiration))
                await fetchMenu({ setLoading: null, expiration});
            }

            cartState.cart.forEach((item) => {
                menus.forEach((menu) => {
                    if(menu.document_name === item.dish.additional_info.menu){ // locates the menu
                        menu.category.forEach((category) => {
                            if(category.document_name === item.dish.additional_info.category){ // locates the category
                                category.dishes.forEach((dish) => {
                                    if(dish.id === item.dish.id){
                                        console.log(dish);
                                        //  compare the price
                                        if(!dish.in_stock){
                                            // remove the dish from the cart
                                            return snackbar.error('A item in your cart is no longer available')
                                        }
        
                                        if(dish.price !== item.dish.price){
                                            // item did not change
                                            
                                            return snackbar.info('The price for a item has been updated')
                                        }
                                    }
                                })
                            }   
                        })
                    }
                })
                // console.log('mapping ran')
                // menus.forEach(menu => {
                //     if(menu.id !== 'ca9fe450-064c-4f9c-b3b0-8ead68d88822'){
                //         menu.category.forEach((category) => {
                //             category.dishes.forEach((dish) => {
                //                 if(dish.id === item.id){
                //                     // compare the price
                //                     if(!dish.in_stock){
                //                         // remove the dish from the cart
                //                         return snackbar.error('A item in your cart is no longer available')
                //                     }
    
                //                     if(dish.price !== item.dish.price){
                //                         // item did not change
                //                         return snackbar.info('The price for a item has been updated')
                //                     }
                //                 }
                //             })
                //         })
                //     }
                // })
                    
            })

           

            // if(!loading){
            //     validateToPlaceOrder(cartState, customerState);
            //     // head to the payment page for online payments
            //     if(cartState.payment_type === 'online'){
            //         await handleOnlineOrder(cartState, customerState);
            //     } else {
            //         await handleInStoreOrCashOrder(cartState, customerState)
            //     }
            //     dispatch(setAllowPayment(true))
            // }
            
        } catch (error) {
            console.log(error)
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
            </Button>
    </CheckoutContainer>
}

