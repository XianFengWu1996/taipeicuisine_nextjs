import { Button, Typography } from "@mui/material";
import Router from "next/router";
import { BsPatchCheck } from "react-icons/bs";


export default function Confirmation () {
    return <div style={{ height: '100vh'}}>
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems:'center', height: 'inherit'}}>
            <div><BsPatchCheck size={100} color="#7FFFD4"/></div>
            <Typography variant="h3">Order Confirmation</Typography>
            <Typography>Your order has been placed. You will receive a email confirmation in a few minutes. </Typography>
            <Button onClick={() => {
                Router.push('/order')
            }}>Return to Home</Button>
        </div>
     
    </div>
}