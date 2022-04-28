import { handleCatchError } from "../errors/custom"
import Router from 'next/router'
import { token } from "./auth"
import axios from "axios"
import { Stripe, StripeElements } from '@stripe/stripe-js'
import store from "../../store/store"
import { orderComplete } from "../../store/slice/cartSlice"
import { isEmpty } from "lodash"
import { IOrderResult } from "../../components/checkout/customerDetails"

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

interface IPayWithMethodId {
    card: IPublicPaymentMethod,
    cart: ICartState, 
    customer: ICustomerState,
}

export const handlePayWithMethodId = async (val: IPayWithMethodId) => {
    try {
        let stripe_result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/payment_method_id`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: { 
                card: val.card,
                total: val.cart.total
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
                is_new: false
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
        console.log('ran')
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
                is_new: val.is_new, 
            }
        })

        // if the order is placed, route to confirmation page
        Router.push('/order/confirmation');
        store.dispatch(orderComplete());
    } catch (error) {
        handleCatchError((error as Error), 'Failed to confirm payment')
    }
}

export const handleInStoreOrCashOrder = async (cart: ICartState, customer: ICustomerState) => {
    
    try {
      // process the order
    let order_response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_cash_order`,
        headers: { 'authorization': `Bearer ${await token()}`},
        data: { cart, customer }
     })

    let order_data: IOrderResult = order_response.data;
    Router.push(`/order/confirmation?order_id=${order_data.order_id}&order_time=${order_data.order_time}&estimate=${order_data.estimate}&item_count=${order_data.item_count}&total=${order_data.total}`)
    store.dispatch(orderComplete())

    } catch (error) {
        handleCatchError(error as Error, 'Failed to place order');
    }
}
