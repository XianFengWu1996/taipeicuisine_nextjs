import { List, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { useAppSelector } from "../../../../store/store"
import { SummaryItem } from "./SummaryItem"

export const CartSummary = () => {
    const cartState = useAppSelector((state) => state.cart)

    return <>
        <Typography variant="h4" sx={{ marginTop: 5}}>Cart Summary</Typography>
                    <List style={{ width: '90%'}}>
                    {
                        cartState.cart.map((item) => {
                            return <SummaryItem key={item.id} item={item}/>
                        })
                    }
                    </List>
                   

                    <List style={{ width: '90%'}}>
                    <Typography>Number of items: {cartState.cart_quantity}</Typography> 


                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Subtotal: </Typography> 
                            <Typography>${cartState.subtotal.toFixed(2)}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Delivery: </Typography> 
                            <Typography>${'0.00'}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Tax: </Typography> 
                            <Typography>${cartState.tax.toFixed(2)}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Tip: </Typography> 
                            <Typography>${cartState.tip.toFixed(2)}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Total: </Typography> 
                            <Typography>${cartState.total.toFixed(2)}</Typography>
                        </div>
                        

                    </List>
    </>
}