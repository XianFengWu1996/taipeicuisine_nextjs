import { Pagination, Typography } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import { isEmpty } from "lodash"
import {  useEffect, useState } from "react"
import { NotAuthorizeError } from "../../utils/errors/notAuthError"
import { getOrderHistory } from "../../utils/functions/account"
import { fbAuth } from "../../utils/functions/auth"
import { OrderHistorySkeleton } from "./historySkeleton"
import { OrderHistoryCard } from "./orderHistoryCard"

export const OrderHistory = () => {
    const [order_list, setOrderList] = useState<IPublicOrder[]>([]);
    const [orderToDisplay, setOrderToDisplay] = useState<IPublicOrder[]>([]);

    const item_per_page = 4;
    const pageCount = Math.ceil(order_list.length / item_per_page);

    const [loading, setLoading] = useState<boolean>(true); // handle skeleton 

    useEffect(() => {          
        let isMounted = true;
        onAuthStateChanged(fbAuth, async user => {
            if(!user){
                throw new NotAuthorizeError();
            }

            const order_result = await getOrderHistory(await user.getIdToken());
            
            if(isMounted && order_result){
                setOrderList(order_result)
                setOrderToDisplay(order_result.slice(0, item_per_page));
                setLoading(false)
            }
            
        })

        return () => { 
            isMounted = false;
        }
    }, [])
    return <>
        {
            loading ? <OrderHistorySkeleton /> : <div style={{ flex :3}}>
            <Typography variant="h4">Order History</Typography>

            
            {
                orderToDisplay.map((order) => {
                    return <OrderHistoryCard key={order.order_id} order={order}/>
                })
            }

            {
                isEmpty(order_list) && <Typography>There is no order yet, try placing a order first</Typography>
            }

            {
                order_list.length > item_per_page && <Pagination sx={{ my: 5}}count={pageCount} variant="outlined" onChange={(_, value) => {
                    let new_arr = order_list.slice((value * item_per_page) - item_per_page, (value * item_per_page));
                    setOrderToDisplay(new_arr)
                }}/>
            }
        </div>
        }
        
    </>
}




