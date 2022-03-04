import { Button, ButtonGroup, Typography } from "@mui/material"
import { setPayment } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store"

export const PaymentSelection = () => {
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    return <div style={{ marginBottom: '15px'}}>
        <Typography variant="h4">Payment</Typography>
        <ButtonGroup size="large">
            <Button
                variant={cartState.paymentType === 'online' ? 'contained' : 'outlined'}
                onClick={() => {
                    dispatch(setPayment('online'))
                }}
            >Pay Online</Button>
            {
                cartState.isDelivery 
                ? <Button 
                    variant={cartState.paymentType === 'cash' ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(setPayment('cash'))
                    }}
                    >Cash</Button>
                : <Button
                variant={cartState.paymentType === 'instore' ? 'contained' : 'outlined'}
                onClick={() => {
                    dispatch(setPayment('instore'))
                }}
                >In Store</Button>
            }
            
        </ButtonGroup>
    </div>
}