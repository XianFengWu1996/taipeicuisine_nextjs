import { Grid, useMediaQuery } from "@mui/material";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import Router from "next/router";
import {  useEffect } from "react";
import { PublicAppBar } from "../../components/appbar/appbar";
import { CartSummary } from "../../components/checkout/cartSummary";
import { CustomerDetails } from "../../components/checkout/customerDetails";
import { setDelivery } from "../../store/slice/cartSlice";
import { getCustomer, setCheckoutSkeleton, setLoginDialog } from "../../store/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { handleCatchError } from "../../utils/errors/custom";
import { fbAuth, token } from "../../utils/functions/auth";
import CheckoutSkeleton from "../../components/checkout/skeleton";



export default function CheckoutPage() {
    const desktop = useMediaQuery('(min-width: 900px)');
    const dispatch = useAppDispatch();
    const { showSkeleton } = useAppSelector(state => state.customer)

    // get the customer information back from the backend
    const getCustomerInfo = async () => {
        try {
            dispatch(setCheckoutSkeleton(true));
            let result = await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer`,
                headers: {
                    'Authorization': `Bearer ${await token()}`
                }
            })

            dispatch(getCustomer(result.data))
            dispatch(setDelivery((result.data.address as IAddress).delivery_fee ?? 0));

            dispatch(setCheckoutSkeleton(false));
        } catch (error) {
            handleCatchError(error as Error, 'Failed to retrieve data, try refresh the page');
        } 
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(fbAuth, async fbUser => {
            if(!fbUser){
                dispatch(setLoginDialog(true));
                Router.push('/order?redirect=checkout');
            }  else {
                getCustomerInfo();
            }
        });

        return () => {
            subscribe();
        }
    }, [])


    return <>
        <PublicAppBar />
            {
                !showSkeleton ? <Grid container spacing={8}>
                    <Grid item lg={7} md={8} sm={12} xs={12}>
                        <CustomerDetails /> 
                    </Grid> 
            
                    {  desktop && <Grid item lg={5} md={4} ><CartSummary /></Grid>  } 
                </Grid> : <CheckoutSkeleton />    
            }

    </>
}