import { Typography } from "@mui/material"
import { BiCoinStack } from "react-icons/bi"

interface IPointDisplay {
    point: number,
}
export const PointDisplay = ({ point } : IPointDisplay) => {
        return  <div style={{ display: 'flex', alignItems: 'center'}}>
        <BiCoinStack color="#FFD700" size={25}/>
        <Typography sx={{ fontSize: 17, fontWeight: 600}}>Available Point: {point} = ${Number((point / 100).toFixed(2))}</Typography>
    </div>
    }