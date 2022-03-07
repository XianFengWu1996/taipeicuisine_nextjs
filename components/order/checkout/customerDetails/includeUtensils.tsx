import { Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { GiThreeLeaves } from "react-icons/gi"
import { setToggleIncludeUtensils } from "../../../../store/slice/cartSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/store"

export const IncludeUtensils = () => {
    const { includeUtensils } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();
    return <Card sx={{ margin: '10px 0', width: '300px', height: '100px'}}>
            <CardContent>
                <Typography sx={{ color: 'green', fontWeight: 700}}>
                      <GiThreeLeaves />  Eco-Friendly
                    </Typography>

                <FormControlLabel control={
                    <Checkbox 
                        value={includeUtensils} 
                        onChange={(e) => dispatch(setToggleIncludeUtensils(e.target.checked))}/>
                    } label="Don&apos;t Include Utensils" />
            </CardContent>
        </Card>
}