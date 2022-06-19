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
import { hasExpired, isLunchTime } from "../../../utils/functions/time"
import { fetchMenu } from "../../../utils/functions/menu"
import { removeItemFromCart, removeSoupFromLunchOption, updateCartItem } from "../../../store/slice/cartSlice"
import { InfoError } from "../../../utils/errors/infoError"


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
    const [loading, setLoading] = useState<boolean>(false)

    const cartState = useAppSelector(state => state.cart)
    const customerState = useAppSelector(state => state.customer)
    const { menus, expiration } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();


    const desktop = useMediaQuery('(min-width: 900px)');

    const handleUpdateDish = (cart: ICartItem[], menu: IMenu[]) => {
        cart.forEach((item) => {
            menu.forEach((menu) => {
                if(menu.document_name === item.dish.additional_info.menu){ // locates the menu
                    menu.category.forEach((category) => {
                        if(category.document_name === item.dish.additional_info.category){ // locates the category
                            category.dishes.forEach((dish) => {
                                if(dish.id === item.dish.id){
                                    //  compare the price
                                    if(!dish.in_stock){
                                        // remove the dish from the cart
                                        dispatch(removeItemFromCart(item))
                                        throw new Error(`${dish.label_id}.${dish.en_name} ${dish.ch_name} is no longer available`);
                                    }
    
                                    if(dish.price !== item.dish.price){
                                        if(item.customize){
                                            dispatch(removeItemFromCart(item))
                                            throw new Error(`${dish.label_id}.${dish.en_name} ${dish.ch_name} has been removed from you cart`);
                                        }
                                        // item did not change
                                        dispatch(updateCartItem(dish))
                                        throw new InfoError(`The price for (${dish.label_id}.${dish.en_name} ${dish.ch_name}) has been updated`)
                                    }
                                }
                            })
                        }   
                    })
                }
            })
            
            if(!isLunchTime && item.lunchOption){
              dispatch(removeSoupFromLunchOption(item.id));
            }
        })
    }

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);

            let temp_menus: IMenu[] = menus;
            if(hasExpired(expiration)){
                let data = await fetchMenu({ setLoading: null, expiration});

                if(data){
                    temp_menus = data;
                }
            }
            handleUpdateDish(cartState.cart, temp_menus);
                      
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

        <IncludeUtensils />

        <PickupTime />

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

