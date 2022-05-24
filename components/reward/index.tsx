import { Card, CardContent, Pagination, Typography } from "@mui/material"
import axios from "axios"
import { format } from "date-fns"
import { onAuthStateChanged } from "firebase/auth"
import Router from "next/router"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { fbAuth } from "../../utils/functions/auth"
import snackbar from "../snackbar"
import { PointDisplay } from "./pointDisplay"
import { RewardTextWithLabel } from "./rewardLabel"

export const RewardPage = () => {

    const [transactions, setTransactions] = useState<IRewardTransaction[]>([]);
    const [point, setPoints] = useState<number>(0);

    // pagination
    const [transactionToDisplay, setTransactionToDisplay] =  useState<IRewardTransaction[]>([]);
    const item_per_page = 6;
    const total_page = Math.ceil(transactions.length / item_per_page);

    useEffect(() => {
        onAuthStateChanged(fbAuth, async(user) => {
            if(!user){
                Router.replace('/order')
                return snackbar.error('No Authorized')
            }

            const reward_result = await axios({
                method: 'get',
                url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/reward_history`,
                headers: {
                    'Authorization':  `Bearer ${await user.getIdToken()}`,
                }
            })
            setTransactions(reward_result.data.rewards.transactions)
            setTransactionToDisplay(reward_result.data.rewards.transactions.slice(0, item_per_page));
            setPoints(reward_result.data.rewards.points)
        })
    }, [])
    return <>
        <Typography variant="h4">Rewards</Typography>

        <PointDisplay point={point}/>

        {
            transactionToDisplay.map((transaction) => {
                return <Card key={v4()} sx={{ my: 2, width: '90%'}}>

                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                            <RewardTextWithLabel label="type" text={transaction.type}/>
                            <RewardTextWithLabel label="order number" text={transaction.order_id}/>
                            <RewardTextWithLabel label="amount" text={transaction.amount} negative={transaction.type !== 'reward'}/>
                            <RewardTextWithLabel label="order place on" text={format(transaction.created_at, 'MM/dd/yy')}/>
                        </CardContent>
                    </Card>
            })
        }

        {
            transactions.length > item_per_page && <Pagination variant="outlined" count={total_page} sx={{ my: 3}} onChange={(_, value) => {
                setTransactionToDisplay(transactions.slice((value * item_per_page) - item_per_page, (value * item_per_page) ))
            }}/>
        }
    </>
}
