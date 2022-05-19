import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material"
import { format } from "date-fns"
import {  useState } from "react"
import { OrderChipGroup } from "../../components/history/orderChipGroup"
import { OrderCartItem } from "./orderCartItem"
import { OrderContact } from "./orderContact"
import { OrderPayment } from "./orderPayment"
import { OrderSpecialInstruction } from "./orderSpecialInstruction"

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

                <>
                    <Divider />
                    {
                        order.summary.discount.lunch_discount !== 0 || order.summary.discount.point_discount !== 0 && <>
                            <Divider />
                            <Typography>Discount</Typography>
                            <Typography>Original Subtotal: {order.summary.original_subtotal}</Typography>
                            {
                                order.summary.discount.lunch_discount !== 0 && <Typography>Lunch Discount: -${order.summary.discount.lunch_discount}</Typography>
                            }

                            {
                                order.summary.discount.point_discount !== 0 && <Typography>Point Discount: -${order.summary.discount.point_discount}</Typography>
                            }

                            <Divider />
                        </>
                    }
                    <Typography>Subtotal: ${order.summary.subtotal}</Typography>
                    {
                        order.delivery.is_delivery && <Typography>Delivery Fee: {order.summary.delivery_fee.toFixed(2)}</Typography>
                    }
                    <Typography>Tax: ${order.summary.tax.toFixed(2)}</Typography>
                    <Typography>Tip: ${order.summary.tip.toFixed(2)}</Typography>
                    <Typography>Total: ${order.summary.total.toFixed(2)}</Typography>
                    <Divider />
                </>

                <>
                <Typography>Point Rewarded: {order.points.reward}</Typography>
                <Typography>Point Used: {order.points.point_redemption}</Typography>
                <Divider />
                </>

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


