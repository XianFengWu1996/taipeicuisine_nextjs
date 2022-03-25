import { Divider, List, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { useAppSelector } from "../../../store/store"
import { PriceDisplay } from "./priceDisplay"
import { SummaryItem } from "./summaryItem"

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

const SummaryContainer = styled('div')(({ theme }) => ({
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
        marginTop: '20px',
    },
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

    return <SummaryContainer>
            <Typography variant="h4">Cart Summary</Typography>
            <ListContainer>
            {
                cartState.cart.map((item) => {
                    return <SummaryItem key={item.id} item={item}/>
                })
            }
            </ListContainer>
            

            <ListContainer>
                { renderSpecialInstruction() }

                <Typography>Number of Items: {cartState.cart_quantity}</Typography> 
                <Divider />
                {   (cartState.point_redemption > 0 || cartState.lunch_discount > 0) &&
                    <div>
                        <Typography>Discounts</Typography>
                        { cartState.lunch_discount > 0 && <PriceDisplay title="Lunch Discount" value={-cartState.lunch_discount} />}
                        { cartState.point_redemption > 0 && <PriceDisplay title="Point Redemption" value={-Number((cartState.point_redemption / 100).toFixed(2))} />}
                    </div>
                }
                <Divider />
                <PriceDisplay title='Subtotal' value={cartState.subtotal} />
                {
                    cartState.is_delivery ? <PriceDisplay title='Delivery' value={cartState.delivery_fee} /> : null
                }
                <PriceDisplay title='Tax' value={cartState.tax} />
                {
                    !isEmpty(cartState.tip_type) ? <PriceDisplay title='Tip' value={cartState.tip} /> : null
                }
                <PriceDisplay title='Total' value={cartState.total} />
            </ListContainer>
        </SummaryContainer>
}