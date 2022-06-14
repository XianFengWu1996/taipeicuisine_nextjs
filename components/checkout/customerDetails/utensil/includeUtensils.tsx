import { Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { GiThreeLeaves } from "react-icons/gi"
import { setToggleIncludeUtensils } from "../../../../store/slice/cartSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/store"

export const IncludeUtensils = () => {
    const { dont_include_utensils } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();

    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setToggleIncludeUtensils(e.target.checked))
    }

    return <Card sx={{ margin: '15px 0', width: '400px', height: '100px'}}>
            <CardContent>
                <Typography sx={{ color: 'green', fontWeight: 700}}>
                      <GiThreeLeaves />  Eco-Friendly  
                    </Typography>

                <FormControlLabel control={
                    <Checkbox 
                        value={dont_include_utensils} 
                        onChange={handleCheckbox} 
                    />
                    } label="Don&apos;t Include Utensils" />
            </CardContent>
        </Card>
}