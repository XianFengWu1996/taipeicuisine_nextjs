import { Chip, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { GiAlarmClock, GiChopsticks } from "react-icons/gi"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { RiShoppingBasket2Line } from "react-icons/ri"

interface IOrderChipGroup {
    is_delivery: boolean, 
    schedule_time:string,
    dont_include_utensils: boolean,
}

export const OrderChipGroup = ({ is_delivery, schedule_time, dont_include_utensils }: IOrderChipGroup) => {
    return <>
        <Chip
            sx={{ mr: 1}}
            label={<Typography sx={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', color: 'white'}}>{is_delivery ? 'Delivery' : 'Pick Up'}</Typography>}
            icon={is_delivery ? <MdOutlineDeliveryDining color="white" size={20} />: <RiShoppingBasket2Line color="white" size={20}/> }
            style={{ backgroundColor: 'grey'}}
        /> 

        {
            !isEmpty(schedule_time) && <Chip 
                sx={{ mr: 1}}
                label={<Typography sx={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase'}}>Schedule Time: {schedule_time}</Typography>}
                color={'info'}
                icon={<GiAlarmClock color="white" size={20}/> }
            /> 
        }

        <Chip 
            label={<Typography sx={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase'}}>{dont_include_utensils ? "Don't Include Utensil" : "Include Utensil"}</Typography>}
                color={dont_include_utensils ? 'error' : 'success'}
            icon={<GiChopsticks color="white" size={20}/> }
        /> 
    </>
}