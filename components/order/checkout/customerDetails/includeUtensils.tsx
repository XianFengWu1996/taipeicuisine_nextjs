import { Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { GiThreeLeaves } from "react-icons/gi"

export const IncludeUtensils = () => {
    return <Card sx={{ margin: '10px 0 25px 0', width: '300px', height: '100px'}}>
            <CardContent>
                <Typography sx={{ color: 'green', fontWeight: 700}}>
                      <GiThreeLeaves />  Eco-Friendly
                    </Typography>

                <FormControlLabel control={<Checkbox />} label="Don&apos;t Include Utensils" />
            </CardContent>
        </Card>
}