import { handleCatchError } from "../errors/custom"
import Router from 'next/router'
import { token } from "./auth"
import axios from "axios"
import store from "../../store/store"
import { orderComplete } from "../../store/slice/cartSlice"
import { isEmpty } from "lodash"
import { Stripe } from "@stripe/stripe-js"
import Cookies from "js-cookie"
import { SetStateAction } from "react"


// handle payments 
export const handlePayWithMethodId = async (val: IPayWithMethodId) => {
    try {
        const order_result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/payment_method_id`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                card: val.card,
                cart: val.cart
            }
        })

        handleCompleteOrder(order_result.data.redirect_url);

    } catch (error) {
        handleCatchError((error as Error), 'Failed to confirm payment')
    }
}

export const handlePayWithIntent = async (val: IPayWithIntent) => {
    try {
        let s_id = Cookies.get('s_id') as string

        let intent = await (val.stripe as Stripe).retrievePaymentIntent(s_id);

        if(intent.paymentIntent?.status !== 'succeeded'){
            // process the payment as a one time payment
            // update the intent before submit the order
            await axios({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/update_payment_intent`,
                headers: { 'Authorization': `Bearer ${await token()}`},
                data: {
                    total: val.cart.total,
                    future_use: val.future_use
                }
            })

            // confirm the payment with stripe
            const { error } = await (val.stripe as Stripe).confirmPayment({
                elements: val.elements,
                redirect: 'if_required',
                confirmParams: {
                    return_url: 'http://localhost:3000/order/payment',
                }
            });
            
            if(error){
                if (error.type === "card_error" || error.type === "validation_error") {
                    throw new Error(error.message ?? "An unexpected error occured.")
                }
            }
        }

        let order_result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/pay_with_intent`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: {
                cart: val.cart,
                customer_name: val.customer.name
            }
        })

        handleCompleteOrder(order_result.data.redirect_url);
    } catch (error) {
        handleCatchError((error as Error), 'Failed to confirm payment')
    }
}

// handle placing orders before payment or cash / instore payment
export const handleInStoreOrCashOrder = async (cart: ICartState, customer: ICustomerState) => {
    try {
      // process the order
    let order_response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_cash_order`,
        headers: { 'authorization': `Bearer ${await token()}`},
        data: { cart, customer }
     })

     handleCompleteOrder(order_response.data.redirect_url); 
    } catch (error) {
        handleCatchError(error as Error, 'Failed to place order');
    }
}

export const handleOnlineOrder = async(cart: ICartState, customer: ICustomerState) => {
    try {
        // process the order
        await axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_online_order`,
          headers: { 'authorization': `Bearer ${await token()}`},
          data: { cart, customer }
       })

        Router.replace('/order/payment');
      } catch (error) {
          handleCatchError(error as Error, 'Unexpected error has occurred');
      }
}

// get payment method list 
export const handleGetPaymentList = async (user_token: string, setCards: (value: SetStateAction<IPublicPaymentMethod[]>) => void) => {
    const method = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/get_payment_method`,
        headers: {
            'authorization': `Bearer ${user_token}`
        }
    })

    if(method.data.cards){
        setCards(method.data.cards);
    }
}

// helper functions 
const handleCompleteOrder = (redirect_url: string) => {
    Router.replace(redirect_url);
    store.dispatch(orderComplete());
}

export const validateToPlaceOrder = (cart: ICartState, customer: ICustomerState) => {
    if(cart.cart.length === 0){
        throw new Error('Add item before proceeding')
    }

    if(!customer.name){
        throw new Error('Add name before proceeding')
    }

    if(!customer.phone){
        throw new Error('Add phone before proceeding')
    }

    if(cart.is_delivery){
        if(cart.subtotal < 15){
            throw new Error('Minimum for delivery is $15 (subtotal)')
        }

        if(!customer.address.address){
            throw new Error('Make sure to have an valid address')
        }

        if(!cart.delivery_fee || cart.delivery_fee === 0){
            throw new Error('Please try to search the address again')
        }
    }

    if(isEmpty(cart.payment_type)){
        throw new Error('Please select a payment method')
    }
}