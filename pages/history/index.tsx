import { Typography } from "@mui/material"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { PublicAppBar } from "../../components/appbar/appbar"
import { OrderHistoryCard } from "../../components/history"
import { handleCatchError } from "../../utils/errors/custom"
import { fbAuth } from "../../utils/functions/auth"

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
        <div style={{ display: 'block', flex: 1, backgroundColor: 'lightblue'}}>
            asd
        </div>

        <div style={{ flex :3}}>
            <Typography variant="h4" sx={{ mx: 5}}>Order History</Typography>
            {
                order_list.map((order) => {
                    return <OrderHistoryCard key={order.order_id} order={order}/>
                })
            }
        </div>
        </div>
      
    </>
}



