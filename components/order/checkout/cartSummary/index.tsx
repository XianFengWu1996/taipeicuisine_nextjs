import { Divider, List, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { useAppSelector } from "../../../../store/store"
import { PriceDisplay } from "../cartSummary/priceDisplay"
import { SummaryItem } from "../cartSummary/summaryItem"

const ListContainer = styled(List)(({ theme }) => ({
    width: '90%', 
    [theme.breakpoints.down('md')]: {
        width: '100%',
    }
}))

const SpecialInstructionText = styled(List)(() => ({
    marginLeft: '5px',
    marginY: '10px', 
    fontWeight: 600, 
    fontStyle: 'italic',
    color: 'red'
}))

export const CartSummary = () => {
    const cartState = useAppSelector((state) => state.cart)

    const renderSpecialInstruction = () => {
        if(isEmpty(cartState.comments)) return null

        return <>
            <Divider />
            <SpecialInstructionText>Special Instruction: { cartState.comments }</SpecialInstructionText>
        </>
        
    }

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
            { renderSpecialInstruction() }
            <Divider />
            <Typography>Number of Items: {cartState.cart_quantity}</Typography> 

            <PriceDisplay title="Point Redemption" value={-Number((cartState.point_redemption / 100).toFixed(2))} />

            <PriceDisplay title='Subtotal' value={cartState.subtotal} />
            {
                cartState.is_delivery ? <PriceDisplay title='Delivery' value={0} /> : null
            }
            <PriceDisplay title='Tax' value={cartState.tax} />
            {
                !isEmpty(cartState.tip_type) ? <PriceDisplay title='Tip' value={cartState.tip} /> : null
            }
            <PriceDisplay title='Total' value={cartState.total} />
        </ListContainer>
    </>
}