import { Chip, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { GiAlarmClock, GiChopsticks } from "react-icons/gi"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { RiShoppingBasket2Line } from "react-icons/ri"

interface IOrderChipGroup {
    is_delivery: boolean, 
    schedule_time:string,
    dont_include_utensils: boolean,
}

const ChipText = styled(Typography)(() => ({
    fontSize: 13, 
    fontWeight: 600, 
    textTransform: 'uppercase', 
    color: 'white'
}))

export const OrderChipGroup = ({ is_delivery, schedule_time, dont_include_utensils }: IOrderChipGroup) => {
    return <div style={{ marginTop: '5px', marginBottom: '15px'}}>
        <Chip
            sx={{ mr: 1}}
            label={<ChipText>{is_delivery ? 'Delivery' : 'Pick Up'}</ChipText>}
            icon={is_delivery ? <MdOutlineDeliveryDining color="white" size={20} />: <RiShoppingBasket2Line color="white" size={20}/> }
            style={{ backgroundColor: 'grey'}}
        /> 

        {
            !isEmpty(schedule_time) && <Chip 
                sx={{ mr: 1}}
                label={<ChipText>Schedule Time: {schedule_time}</ChipText>}
                color={'info'}
                icon={<GiAlarmClock color="white" size={20}/> }
            /> 
        }

        <Chip 
            label={<ChipText>{dont_include_utensils ? "Don't Include Utensil" : "Include Utensil"}</ChipText>}
            color={dont_include_utensils ? 'error' : 'success'}
            icon={<GiChopsticks color="white" size={20}/> }
        /> 
    </div>
}