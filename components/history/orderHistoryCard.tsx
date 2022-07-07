import { Box, Card, CardContent, Collapse, Divider, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { OrderCartItem } from "./orderCartItem";
import { OrderChipGroup } from "./orderChipGroup";
import { OrderContact } from "./orderContact";
import { OrderPayment } from "./orderPayment";
import { OrderReward } from "./orderReward";
import { OrderSpecialInstruction } from "./orderSpecialInstruction";
import { OrderSummaryList } from "./orderSummaryList";
import { format_date } from "../../utils/functions/time";

export const OrderHistoryCard = ({order} : {order: IPublicOrder}) => {
    const [expand, setExpand] = useState<boolean>(false)
    const isMobile = useMediaQuery('(max-width: 720px)'); // check if it' mobile 

    return <>
        <Card  sx={{ mt: 3, width: '100%'}} onClick={() => { setExpand(!expand) }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: 3}}>
                <div>
                    <Typography sx={{ fontWeight: 600, fontSize: 11}}>{format_date(order.created_at)}</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: 11}}>Number of Items: {order.summary.cart_quantity}</Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: 14}}>Order #: {order.order_id}</Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: 14}}>Total: ${order.summary.total.toFixed(2)}</Typography>
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

                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row'}}>
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