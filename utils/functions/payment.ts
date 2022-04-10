import { handleCatchError } from "../errors/custom"
import Router from 'next/router'
import { token } from "./auth"
import axios from "axios"
import { Stripe, StripeElements } from '@stripe/stripe-js'
import store from "../../store/store"
import { orderComplete } from "../../store/slice/cartSlice"

interface IPayWithMethodId {
    card: IPublicPaymentMethod,
    total: number,
    cart: ICartState, 
    customer: ICustomerState,
    is_new: boolean
}

export const handlePayWithMethodId = async (val: IPayWithMethodId) => {
    try {
        let stripe_result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/payment_method_id`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                card: val.card,
                total: val.total,
            }
        })

        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_online_order`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                cart: val.cart,
                customer: {
                    name: val.customer.name,
                    phone: val.customer.phone,
                    address: val.customer.address
                },
                payment_intent: stripe_result.data.payment_intent,
                is_new: val.is_new
            }
        })

        Router.push('/order/confirmation')
        store.dispatch(orderComplete());

    } catch (error) {
        handleCatchError((error as Error), 'Failed to confirm payment')
    }
}

interface IPayWithIntent {
    future_use: boolean,
    stripe: Stripe,
    elements: StripeElements,
    cart: ICartState, 
    customer: ICustomerState,
    is_new: boolean,
}

export const handlePayWithIntent = async (val: IPayWithIntent) => {
    try {
        // process the payment as a one time payment
        // update the intent before submit the order
        let update_result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/update_payment_intent`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: {
                total: val.cart.total,
                future_use: val.future_use
            }
        })

        // confirm the payment with stripe
        const { error } = await val.stripe.confirmPayment({
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
        

        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_online_order`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                cart: val.cart,
                customer: {
                    name: val.customer.name,
                    phone: val.customer.phone,
                    address: val.customer.address
                },
                payment_intent: update_result.data.payment_intent,
                is_new: val.is_new
            }
        })

        // // if the order is placed, route to confirmation page
        Router.push('/order/confirmation');
        store.dispatch(orderComplete());
    } catch (error) {
        handleCatchError((error as Error), 'Failed to confirm payment')
    }
}