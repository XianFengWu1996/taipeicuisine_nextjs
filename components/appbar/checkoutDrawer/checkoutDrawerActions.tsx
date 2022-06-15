import { Button } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { clearCart } from "../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export const CartDrawerActions = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            setLoading(false);
        }
    }, [])

    return  <div style={{
        width: 'inherit',
        backgroundColor: '#fff',
        height: '80px',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',                    
    }}> 
        <Button variant="contained" sx={{ minWidth: '170px'}} onClick={() => {
            setLoading(true);
            Router.push('/order/checkout').then(() => {
                setLoading(false);
            });
        }}>{
            loading ? <PulseLoader size={4} color="#fff" />: <>
                Checkout | ${cartState.subtotal.toFixed(2)}
            </>
        }</Button>
        <Button sx={{ marginLeft: '15px'}} onClick={() => dispatch(clearCart())}>Clear Cart</Button>
    </div>
}