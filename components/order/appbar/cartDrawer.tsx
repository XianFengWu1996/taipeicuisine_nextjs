import { Card, CardContent, IconButton, SwipeableDrawer, Typography } from "@mui/material"
import { Box, fontSize, styled } from "@mui/system"
import { useAppSelector } from "../../../store/store"
import { ImageWithFallback } from "../../images"
import { QuantityController } from "../../quantityController"
import { FiTrash2 } from 'react-icons/fi'
import { isEmpty } from "lodash"

interface ICartDrawerProps {
    open:boolean, 
    handleOpen: () => void,
    handleClose: () => void,
}

const PriceText = styled(Typography)(({ theme }) => ({
    fontSize: '13px',
    margin: '2px 0',
    fontWeight: 'bold'
}))

export const CartDrawer = (props: ICartDrawerProps) => {
    const cartState = useAppSelector(state => state.cart);
    return <SwipeableDrawer
              anchor='right'
              open={props.open}
              onClose={props.handleClose}
              onOpen={props.handleOpen}
        >
            <Box sx={{ width: '450px', backgroundColor: 'aliceblue'}}>
                <Typography>Cart</Typography>

                {
                    cartState.cart.map((item) => {
                        return <CartDrawerItem 
                            key={item.id}
                            item={item}
                        />
                    })
                }
                
            </Box>
        </SwipeableDrawer>
}

interface ICartDrawerItemProps {
    item: ICartItem
}

const CartDrawerItem = ({ item }: ICartDrawerItemProps) => {
    let { dish } = item;
    return <Card sx={{ margin: '15px'}}>
        <CardContent sx={{ display: 'flex', width: '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography sx={{ fontSize: '13px'}}>{dish.label_id} {dish.en_name} {dish.ch_name}</Typography>
                        {
                            !isEmpty(item.option) ? <Typography sx={{ fontSize: '11px'}}>Option: {item.option.en_name} {item.option.ch_name}</Typography> : null
                        }
                        <PriceText>${(dish.price + (item.option.price ?? 0) ).toFixed(2)}</PriceText>
                    </div>

                    <div style={{ paddingLeft: '5px'}}>
                        <ImageWithFallback 
                            src={dish.pic_url} 
                            label={dish.en_name} 
                            width={70}
                            height={70}/>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <QuantityController 
                        quantity={item.quantity}
                        handleIncrease={() => {}}
                        handleDecrease={() => {}}
                        height={'35px'}
                        width={'100px'}
                        fontSize="14px"
                        leftRightPadding={6}
                    />

                    <PriceText>${item.total.toFixed(2)}</PriceText>

                    <IconButton>
                        <FiTrash2 />
                    </IconButton>
                </div>
            </div>
        </CardContent>
    </Card>
}