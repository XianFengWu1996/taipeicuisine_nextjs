import { Card, CardContent, Collapse, Divider, Pagination, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { format } from "date-fns"
import { onAuthStateChanged } from "firebase/auth"
import {  useEffect, useState } from "react"
import { OrderChipGroup } from "../../components/history/orderChipGroup"
import { handleCatchError } from "../../utils/errors/custom"
import { fbAuth } from "../../utils/functions/auth"
import { OrderCartItem } from "./orderCartItem"
import { OrderContact } from "./orderContact"
import { OrderPayment } from "./orderPayment"
import { OrderReward } from "./orderReward"
import { OrderSpecialInstruction } from "./orderSpecialInstruction"
import { OrderSummaryList } from "./orderSummaryList"

export const OrderHistory = () => {
    const [order_list, setOrderList] = useState<IPublicOrder[]>([]);
    const [orderToDisplay, setOrderToDisplay] = useState<IPublicOrder[]>([]);

    const item_per_page = 4;
    const pageCount = Math.ceil(order_list.length / item_per_page);

    useEffect(() => {
        console.log('ran to get order')
        onAuthStateChanged(fbAuth, async user => {
            if(!user){
                return console.log('do something here')
            }

            try {
                const history_result = await axios({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/order_history`,
                    headers: {
                        'Authorization':  `Bearer ${await user.getIdToken()}`,
                    }
                })
                setOrderList(history_result.data.order_list);

                setOrderToDisplay(history_result.data.order_list.slice(0, item_per_page))
            } catch (error) {

                console.log(error);
                handleCatchError(error as Error, 'Failed to retrieve order history')
            }


        })
    }, [])
    return <>
        <div style={{ flex :3}}>
            <Typography variant="h4" sx={{ mx: 5}}>Order History</Typography>

            
            {
                orderToDisplay.map((order) => {
                    return <OrderHistoryCard key={order.order_id} order={order}/>
                })
            }

            {
                order_list.length > item_per_page && <Pagination sx={{ mb: 5, mx: 2.5 }}count={pageCount} variant="outlined" onChange={(event, value) => {
                    let new_arr = order_list.slice((value * item_per_page) - item_per_page, (value * item_per_page));
    
                    setOrderToDisplay(new_arr)
                }}/>
            }
        </div>
    </>
}

export const OrderHistoryCard = ({order} : {order: IPublicOrder}) => {
    const [expand, setExpand] = useState<boolean>(false)
    return <>
        <Card  sx={{ mt: 3, margin: 3, width: '85%'}} onClick={() => {
            setExpand(!expand);
        }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: 3}}>
                <div>
                    <Typography sx={{ fontWeight: 500}}>{format(order.created_at, 'MM/dd/yyyy HH:mm')}</Typography>
                    <Typography sx={{ fontWeight: 500}}>Order #: {order.order_id}</Typography>
                </div>

                <div>
                    <Typography sx={{ fontWeight: 500}}>Total: ${order.summary.total.toFixed(2)}</Typography>
                    <Typography sx={{ fontWeight: 500}}>Number of Items: {order.summary.cart_quantity}</Typography>
                </div>
            </CardContent>
            <Divider />
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <CardContent sx={{ padding: 3}}>

                <OrderChipGroup
                    is_delivery={order.delivery.is_delivery}
                    schedule_time={order.additional_request.schedule_time}
                    dont_include_utensils={order.additional_request.dont_include_utensils}
                />

                <Box sx={{ display: 'flex'}}>
                    <OrderContact
                        name={order.user.name}
                        phone={order.user.phone}
                        address={order.delivery.address}
                    />

                    <OrderPayment
                        payment_type={order.payment.payment_type}
                        card={order.payment.stripe.card}
                    />

                </Box>

                <Divider sx={{ my: 2}}/>
                {
                    order.items.map((item) => {
                        return <OrderCartItem key={item.id} item={item}/>
                    })
                }

                <OrderSpecialInstruction
                    comments={order.additional_request.comments}
                /> 

                <OrderSummaryList
                    is_delivery={order.delivery.is_delivery}
                    summary={order.summary}
                />

                <OrderReward 
                    points={order.points.reward}
                />
                </CardContent>
            </Collapse>
        </Card>
    </>
}


