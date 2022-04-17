import { Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { GiAlarmClock, GiThreeLeaves } from "react-icons/gi"

export const PickupTime = () => {
    return <Card sx={{ margin: '10px 0', width: '300px', height: '100px'}}>
    <CardContent>
        <Typography sx={{ color: blue[300], fontWeight: 700}}>
              <GiAlarmClock size={18}/>  Pickup Time
            </Typography>

        <FormControlLabel control={
            <Checkbox 
               
            />
            } label="Don&apos;t Include Utensils" />
    </CardContent>
</Card>
}