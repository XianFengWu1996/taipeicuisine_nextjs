import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GetStaticPropsContext } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { CartSummary } from "../../components/order/checkout/cartSummary";
import { CustomerDetails } from "../../components/order/checkout/customerDetails";
import { setLoginDialog } from "../../store/slice/customerSlice";
import { useAppDispatch } from "../../store/store";
import { app, fbAuth } from "../../utils/functions/auth";

export default function CheckoutPage() {
    const desktop = useMediaQuery('(min-width: 900px)');
    const dispatch = useAppDispatch();

    const user = getAuth(app).currentUser;

    onAuthStateChanged(fbAuth, user => {
        if(user) {

        } else {
            // Router.push('/order?no_auth=true&redirect=checkout');
            // dispatch(setLoginDialog(true));
        }
    })

    return <>
        <PublicAppBar />
        <Grid container>
                <Grid item lg={7} md={8} sm={12}>
                    <CustomerDetails /> 
                </Grid> 
                
                {
                    desktop ? <Grid item lg={5} md={4}>
                        <CartSummary />
                    </Grid> : null
                } 
        </Grid>
    </>
}