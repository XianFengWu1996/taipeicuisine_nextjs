import { Button, ButtonGroup, Typography } from "@mui/material"
import { setPayment } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store"

export const PaymentSelection = () => {
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    return <div style={{ marginBottom: '25px'}}>
        <Typography variant="h4">Payment</Typography>
        <ButtonGroup size="large">
            <Button
                variant={cartState.payment_type === 'online' ? 'contained' : 'outlined'}
                onClick={() => {
                    dispatch(setPayment('online'))
                }}
            >Pay Online</Button>
            {
                cartState.is_delivery 
                ? <Button 
                    variant={cartState.payment_type === 'cash' ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(setPayment('cash'))
                    }}
                    >Cash</Button>
                : <Button
                variant={cartState.payment_type === 'instore' ? 'contained' : 'outlined'}
                onClick={() => {
                    dispatch(setPayment('instore'))
                }}
                >In Store</Button>
            }
            
        </ButtonGroup>
    </div>
}