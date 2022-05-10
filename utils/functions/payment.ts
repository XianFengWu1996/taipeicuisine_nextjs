import { handleCatchError } from "../errors/custom"
import Router from 'next/router'
import { token } from "./auth"
import axios from "axios"
import store from "../../store/store"
import { orderComplete } from "../../store/slice/cartSlice"
import { isEmpty } from "lodash"
import { Stripe } from "@stripe/stripe-js"
import Cookies from "js-cookie"

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

        // let order_result = await axios({
        //     method: 'POST',
        //     url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/place_online_order`,
        //     headers: { 'Authorization': `Bearer ${await token()}`},
        //     data: { 
        //         cart: val.cart,
        //         customer: {
        //             name: val.customer.name,
        //             phone: val.customer.phone,
        //             address: val.customer.address
        //         },
        //         payment_intent: stripe_result.data.payment_intent,
        //         is_new: false
        //     }
        // })

        // handleOrderCompletion(order_result.data)

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
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/confirm_online_order`,
            headers: { 'Authorization': `Bearer ${await token()}`},
            data: {
                cart: val.cart,
            }
        })

        handleOrderCompletion(order_result.data)
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

    handleOrderCompletion(order_response.data);
 
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

        Router.push('/order/payment');
      } catch (error) {
          handleCatchError(error as Error, 'Unexpected error has occurred');
      }
}

const handleOrderCompletion = (order: IOrderResult) => {
    Router.push(`/order/confirmation?order_id=${order.order_id}&order_time=${order.order_time}&estimate=${order.estimate}&item_count=${order.item_count}&total=${order.total}`)
    store.dispatch(orderComplete())
}