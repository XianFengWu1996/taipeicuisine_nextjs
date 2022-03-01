import { Button } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

export const CartDrawerActions = () => {
    const cartState = useAppSelector(state => state.cart);
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
        <Button variant="contained">Checkout | ${cartState.subtotal.toFixed(2)}</Button>
    </div>
}