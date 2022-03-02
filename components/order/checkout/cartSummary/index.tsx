import { Divider, List, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { useAppSelector } from "../../../../store/store"
import { PriceDisplay } from "../cartSummary/priceDisplay"
import { SummaryItem } from "../cartSummary/SummaryItem"

const ListContainer = styled(List)(() => ({
    width: '90%', 
}))

export const CartSummary = () => {
    const cartState = useAppSelector((state) => state.cart)

    return <>
        <Typography variant="h4" sx={{ marginTop: 5}}>Cart Summary</Typography>
        <ListContainer>
        {
            cartState.cart.map((item) => {
                return <SummaryItem key={item.id} item={item}/>
            })
        }
        </ListContainer>
        

        <ListContainer>
            <Divider />
            <Typography>Number of Items: {cartState.cart_quantity}</Typography> 
            <PriceDisplay title='Subtotal' value={cartState.subtotal} />
            <PriceDisplay title='Delivery' value={0} />
            <PriceDisplay title='Tax' value={cartState.tax} />
            <PriceDisplay title='Tip' value={cartState.tip} />
            <PriceDisplay title='Total' value={cartState.total} />
        </ListContainer>
    </>
}