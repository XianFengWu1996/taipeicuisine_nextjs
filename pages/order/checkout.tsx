import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import Router from "next/router";
import {  useEffect, useState } from "react";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { CartSummary } from "../../components/order/checkout/cartSummary";
import { CustomerDetails } from "../../components/order/checkout/customerDetails";
import { setLoginDialog } from "../../store/slice/customerSlice";
import { useAppDispatch } from "../../store/store";
import {  app, fbAuth } from "../../utils/functions/auth";

export default function CheckoutPage() {
    const desktop = useMediaQuery('(min-width: 900px)');
    const dispatch = useAppDispatch();

    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        const subscribe = onAuthStateChanged(fbAuth, async fbUser => {
            setUser(fbUser);
            if(fbUser){
            } else {
                dispatch(setLoginDialog(true));
                Router.push('/order?redirect=checkout');
            }
        });

        return () => {
            subscribe();
        }
    }, [])


    return <>
        <PublicAppBar />
        <Grid container >
                <Grid item lg={7} md={8} sm={12}>
                    <CustomerDetails user={user} /> 
                </Grid> 
                
                {
                    desktop ? <Grid item lg={5} md={4} >
                        {
                            user 
                                ? <CartSummary /> 
                                : <Skeleton variant="rectangular" width={'90%'} height={300} sx={{ marginTop: 5}}/>
                        }    
                    </Grid> : null
                } 
        </Grid>
    </>
}