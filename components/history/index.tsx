import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { format } from "date-fns"
import {  useState } from "react"
import { OrderChipGroup } from "../../components/history/orderChipGroup"
import { OrderCartItem } from "./orderCartItem"
import { OrderContact } from "./orderContact"
import { OrderPayment } from "./orderPayment"
import { OrderReward } from "./orderReward"
import { OrderSpecialInstruction } from "./orderSpecialInstruction"
import { OrderSummaryList } from "./orderSummaryList"

export const OrderHistoryCard = ({order} : {order: IPublicOrder}) => {
    console.log(order);
    const [expand, setExpand] = useState<boolean>(false)
    return <>
        <Card  sx={{ mt: 3, margin: 3, width: '85%'}} onClick={() => {
            setExpand(!expand);
        }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: 5}}>
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
                <CardContent sx={{ padding: 5}}>

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


