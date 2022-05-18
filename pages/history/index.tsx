import { Card, CardContent, Typography } from "@mui/material"
import axios from "axios"
import { format } from "date-fns"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { PublicAppBar } from "../../components/appbar/appbar"
import { handleCatchError } from "../../utils/errors/custom"
import { fbAuth } from "../../utils/functions/auth"
import { phoneFormat } from "../../utils/functions/phone"

export default function HistoryPage() {
    const [order_list, setOrderList] = useState<IPublicOrder[]>([]);
 
    useEffect(() => {
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
                console.log(history_result)
                setOrderList(history_result.data.order_list);
            } catch (error) {

                console.log(error);
                handleCatchError(error as Error, 'Failed to retrieve order history')
            }


        })
    }, []) 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
        <div style={{ display: 'block', width: '350px', backgroundColor: 'lightblue'}}>
            asd
        </div>

        <div>
            <Typography variant="h4" sx={{ mx: 5}}>Order History</Typography>
            {
                order_list.map((order) => {
                    return <Card key={order.order_id} sx={{ mt: 5, mx: 5}}>
                        <CardContent>
                            <div>
                                <Typography>{format(order.created_at, 'MM/dd/yyyy HH:mm')}</Typography>
                                <Typography>Order #: {order.order_id}</Typography>
                                <Typography>Name: {order.user.name}</Typography>
                                <Typography>Phone: {phoneFormat(order.user.phone)}</Typography>
                            </div>

                            <div>
                                <Typography>Total: ${order.summary.total}</Typography>
                                <Typography>Number Of Items: {}</Typography>
                            </div>
                        </CardContent>
                    </Card>
                })
            }
        </div>
        </div>
      
    </>
}