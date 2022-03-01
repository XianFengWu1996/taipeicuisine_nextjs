import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { decreaseQty, increaseQty, removeItemFromCart } from "../../../../store/slice/cartSlice";
import { useAppDispatch } from "../../../../store/store";
import { ImageWithFallback } from "../../../images";
import { QuantityController } from "../../../quantityController";
import { FiTrash2 } from 'react-icons/fi'
import { styled } from "@mui/system";

interface ICartDrawerItemProps {
    item: ICartItem
}

const PriceText = styled(Typography)(({ theme }) => ({
    fontSize: '13px',
    margin: '2px 0',
    fontWeight: 'bold'
}))

export const CartDrawerItem = ({ item }: ICartDrawerItemProps) => {
    let { dish } = item;
    const dispatch = useAppDispatch();

    return <Card sx={{ margin: '15px'}}>
        <CardContent sx={{ display: 'flex', width: '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography sx={{ fontSize: '13px'}}>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                        {
                            !isEmpty(item.option) ? <Typography sx={{ fontSize: '11px'}}>Option: {item.option.en_name} {item.option.ch_name}</Typography> : null
                        }
                        <PriceText>${dish.price.toFixed(2)}</PriceText>
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
                        handleIncrease={() => {
                            dispatch(increaseQty(item));
                        }}
                        handleDecrease={() => {
                            dispatch(decreaseQty(item));
                        }}
                        height={'35px'}
                        width={'100px'}
                        fontSize="14px"
                        leftRightPadding={6}
                    />

                    <PriceText>${item.total.toFixed(2)}</PriceText>

                    <IconButton onClick={() => {
                        dispatch(removeItemFromCart(item))
                    }}>
                        <FiTrash2 />
                    </IconButton>
                </div>
            </div>
        </CardContent>
    </Card>
}