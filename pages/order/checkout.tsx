import { Button, ButtonGroup, Card, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { CartSummary } from "../../components/order/checkout/cartSummary";
import { CustomerDetails } from "../../components/order/checkout/customerDetails";

export default function CheckoutPage() {
    return <>
        <PublicAppBar />
        <Grid container>
                <Grid item lg={8} md={7}>
                    <CustomerDetails />
                </Grid>
                <Grid item lg={4} md={5}>
                    <CartSummary />
                </Grid>
        </Grid>
    </>
}