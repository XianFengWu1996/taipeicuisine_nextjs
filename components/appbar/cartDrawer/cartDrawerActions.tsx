import { Button } from "@mui/material";
import Router from "next/router";
import { clearCart } from "../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export const CartDrawerActions = () => {
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch()
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
        <Button variant="contained" onClick={() => {
            Router.push('/order/checkout');
        }}>Checkout | ${cartState.subtotal.toFixed(2)}</Button>
        <Button sx={{ marginLeft: '15px'}} onClick={() => dispatch(clearCart())}>Clear Cart</Button>
    </div>
}