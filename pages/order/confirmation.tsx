import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Router, { useRouter } from "next/router";
import { BsPatchCheck } from "react-icons/bs";

export const ConfirmationTitle = styled(Typography)(({ theme }) => ({
    fontSize: 50,
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
        fontSize: 40,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 30,
    }
}))

export const ConfirmationCardText = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    lineHeight: 1.6,

    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        fontWeight: 500,
    }
}))

export default function Confirmation () {
    const query = useRouter().query as unknown as IOrderResult;

    return <div style={{ height: '100vh', padding: '0 20px'}}>
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems:'center', height: 'inherit'}}>
            <div><BsPatchCheck size={100} color="#7FFFD4"/></div>
            <ConfirmationTitle>Order Confirmation</ConfirmationTitle>

            <Card sx={{ my: 3, maxWidth: '90%', minWidth: '300px'}}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                    <Typography sx={{ fontWeight: 800}}>Order Summary</Typography>
                    <ConfirmationCardText>Name: {query.name}</ConfirmationCardText>
                    <ConfirmationCardText>Order #: {query.order_id}</ConfirmationCardText>
                    <ConfirmationCardText>Number of Item(s): {query.item_count}</ConfirmationCardText>
                    <ConfirmationCardText>Total: ${query.total}</ConfirmationCardText>
                    <ConfirmationCardText>Place On: {query.order_time}</ConfirmationCardText>
                    <ConfirmationCardText>Estimate Time: {query.estimate} minutes</ConfirmationCardText>
                </CardContent>
            </Card>
            <Typography>Your order has been placed. You will receive a email confirmation once the staff confirms the order. </Typography>
            <Button onClick={() => {
                Router.replace('/order')
            }}>Return to Home</Button>
        </div>
     
    </div>
}