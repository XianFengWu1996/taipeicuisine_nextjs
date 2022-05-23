import { Card, CardContent, Typography } from "@mui/material"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import Router from "next/router"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { fbAuth } from "../../utils/functions/auth"
import snackbar from "../snackbar"

export const RewardPage = () => {

    const [transactions, setTransactions] = useState<IRewardTransaction[]>([]);
    const [point, setPoints] = useState<number>(0);

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
            setPoints(reward_result.data.rewards.points)
        })
    }, [])
    return <>
        <Typography variant="h4" sx={{ mx: 5}}>Rewards</Typography>

        <Typography>{point}</Typography>

        {
            transactions.map((transaction) => {
                return <Card key={v4()}>

                        <CardContent>
                            <Typography>{transaction.type}</Typography>
                            <Typography>{transaction.order_id}</Typography>
                            <Typography>{transaction.amount}</Typography>
                            <Typography>{transaction.created_at}</Typography>

                        </CardContent>
                    </Card>
            })
        }
    </>
}