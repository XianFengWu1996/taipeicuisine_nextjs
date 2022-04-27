import { Button, Card, CardContent, Typography } from "@mui/material";
import Router, { useRouter } from "next/router";
import { BsPatchCheck } from "react-icons/bs";
import { IOrderResult } from "../../components/checkout/customerDetails";
import { useAppSelector } from "../../store/store";


export default function Confirmation () {
    const query = useRouter().query as unknown as IOrderResult;
    const { name }= useAppSelector(state => state.customer)



    return <div style={{ height: '100vh'}}>
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems:'center', height: 'inherit'}}>
            <div><BsPatchCheck size={100} color="#7FFFD4"/></div>
            <Typography variant="h3">Order Confirmation</Typography>

            <Card sx={{ my: 3}}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                    <Typography sx={{ fontWeight: 800}}>Order Details</Typography>
                    <Typography sx={{ fontWeight: 600}}>Name: {name}</Typography>
                    <Typography sx={{ fontWeight: 600}}>Order #: {query.order_id}</Typography>
                    <Typography sx={{ fontWeight: 600}}>Number Of Item(s): {query.item_count}</Typography>
                    <Typography sx={{ fontWeight: 600}}>Total: ${query.total}</Typography>
                    <Typography sx={{ fontWeight: 600}}>Place At: {query.order_time}</Typography>
                    <Typography sx={{ fontWeight: 600}}>Estimate Time: {query.estimate} minutes</Typography>
                </CardContent>
            </Card>
            <Typography>Your order has been placed. You will receive a email confirmation in a few minutes. </Typography>
            <Button onClick={() => {
                Router.push('/order')
            }}>Return to Home</Button>
        </div>
     
    </div>
}