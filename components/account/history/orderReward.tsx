import { Divider, Typography } from "@mui/material"
import { BiCoinStack } from "react-icons/bi"
import { TitleText } from "./orderContact"

interface IOrderReward {
    points: number
}
export const OrderReward = ({ points } : IOrderReward) => {
    return <>
    <TitleText>Reward</TitleText>
    <div style={{ display: 'flex', alignItems: 'center'}}>
        <BiCoinStack color="#FFD700"/>
        <Typography>You&apos;ve earn {points} points with this order</Typography>
    </div>

    <Divider sx={{ my: 2 }}/>
</>
}