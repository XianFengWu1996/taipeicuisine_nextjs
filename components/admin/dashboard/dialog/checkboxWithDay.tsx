import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

export const CheckBoxWithDay = ({day, onChanged} :{day: hours, onChanged: (arg0: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <>
    <FormGroup>
        <FormControlLabel control={
        <Checkbox checked={day.open_for_business} onChange={onChanged}/>
        
        } label={day.day_of_week} />
    </FormGroup>
    </>
}