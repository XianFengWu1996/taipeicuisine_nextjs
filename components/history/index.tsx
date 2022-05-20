import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { format } from "date-fns"
import {  useState } from "react"
import { BiCoinStack } from "react-icons/bi"
import { OrderChipGroup } from "../../components/history/orderChipGroup"
import { OrderCartItem } from "./orderCartItem"
import { OrderContact, TitleText } from "./orderContact"
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
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <Typography>{format(order.created_at, 'MM/dd/yyyy HH:mm')}</Typography>
                    <Typography>Order #: {order.order_id}</Typography>
                </div>

                <div>
                    <Typography>Total: ${order.summary.total}</Typography>
                    <Typography>Number of Items: {order.summary.cart_quantity}</Typography>
                </div>
            </CardContent>
            <Divider />
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <CardContent>

                <OrderChipGroup
                    is_delivery={order.delivery.is_delivery}
                    schedule_time={order.additional_request.schedule_time}
                    dont_include_utensils={order.additional_request.dont_include_utensils}
                />

                <OrderContact
                    name={order.user.name}
                    phone={order.user.phone}
                    address={order.delivery.address}
                />

                <OrderPayment
                    payment_type={order.payment.payment_type}
                    card={order.payment.stripe.card}
                />

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
               

                {
                    order.summary.refund && <>
                        <Typography>REFUND</Typography>
                        <Typography>Amount: ${order.summary.refund.amount}</Typography>
                        <Typography>Reason: {order.summary.refund.refund_reason}</Typography>
                    </>
                }
            

                </CardContent>
            </Collapse>
        </Card>
    </>
}


