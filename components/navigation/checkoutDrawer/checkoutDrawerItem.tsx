import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { decreaseQty, increaseQty, removeItemFromCart } from "../../../store/slice/cartSlice";
import { useAppDispatch } from "../../../store/store";
import { MenuPreviewImage } from "../../images";
import { QuantityController } from "../../quantityController";
import { FiTrash2 } from 'react-icons/fi'
import { styled } from "@mui/system";
import { GoFlame } from "react-icons/go";
import { blue, red } from "@mui/material/colors";

interface ICartDrawerItemProps {
    item: ICartItem
}

const PriceText = styled(Typography)(() => ({
    fontSize: '13px',
    margin: '2px 0',
    fontWeight: 'bold'
}))

export const CartDrawerItem = ({ item }: ICartDrawerItemProps) => {
    let { dish } = item;
    const dispatch = useAppDispatch();
    const opt = item.lunchOption

    return <Card sx={{ margin: '15px'}}>
        <CardContent sx={{ display: 'flex', width: '100%', paddingBottom: '7px!important'}}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography sx={{ fontSize: '13px'}}>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                        {
                            item.option &&  <Typography sx={{ fontSize: '11px'}}>Option: {item.option.en_name} {item.option.ch_name} {item.option.spicy ? <GoFlame color="red"/>: null }</Typography> 
                        }
                       
                        {
                            item.comment &&  <Typography sx={{ color: red[400],fontSize: '11px'}}>Comments: {item.comment}</Typography> 
                        }
                        <PriceText>${dish.price.toFixed(2)}</PriceText>

                        {
                            (opt && (opt.sub || opt.no_rice || opt.no_soup) ) && <Typography sx={{fontSize: '12px', fontWeight: 600, fontStyle: 'italic', color: blue[600] }}>
                                 Lunch Option: 
                                {opt.sub && 'Hot&Sour soup, '}
                                {opt.no_rice && 'No Rice, '} 
                                {opt.no_soup && 'No Soup '}
                            </Typography>
                        }

                        {
                            item.customize && <>
                                {
                                    item.customize.protein.map((protein) => {
                                        return <Typography key={protein.id} sx={{ fontSize: 11, fontWeight:600}}> · Extra {protein.en_name} 加{protein.ch_name} +${protein.price}</Typography>
                                    })
                                }

                                {
                                    item.customize.veggie.map((veggie) => {
                                        return <Typography key={veggie.id} sx={{ fontSize: 11, fontWeight:600}}> · Extra {veggie.en_name} 加{veggie.ch_name} +${veggie.price}</Typography>
                                    })
                                }
                            </>
                        }
                    </div>

                    <div style={{ paddingLeft: '5px'}}>
                        <MenuPreviewImage
                            src={dish.pic_url} 
                            label={dish.en_name} 
                            allow_zoom
                        />
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