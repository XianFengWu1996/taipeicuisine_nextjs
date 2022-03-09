import { Grid, useMediaQuery } from "@mui/material";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { CartSummary } from "../../components/order/checkout/cartSummary";
import { CustomerDetails } from "../../components/order/checkout/customerDetails";

export default function CheckoutPage() {
    const desktop = useMediaQuery('(min-width: 900px)');

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