import { Button, ButtonGroup, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { setPayment } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store"

export const PaymentSelection = () => {
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    return <div style={{ marginBottom: '25px'}}>
        <Typography variant="h4">Payment</Typography>         
        {cartState.total < 10 && <Typography sx={{ color: red[400], mb: 1.5}}>Miniumum for Credit Card is $10 (In store or online)**</Typography>}

        <ButtonGroup size="large">
            <Button
                disabled={cartState.total < 10}
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