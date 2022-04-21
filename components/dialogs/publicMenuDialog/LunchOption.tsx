import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { ChangeEvent } from "react"

interface ILunchOptionProps {
    lunchOption: {
        sub: boolean,
        no_soup:boolean,
        no_rice:boolean,
    },
    handleOnOptionChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleOnSubChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LunchOption = (_: ILunchOptionProps) => {
    return <FormGroup>
        <FormControlLabel 
            control={<Checkbox
                name="sub"
                checked={_.lunchOption.sub}
                onChange={_.handleOnSubChange}
            />} label="Substitute Hot&Sour Soup" />
        <FormControlLabel  
            control={<Checkbox 
                name="no_soup"
                checked={_.lunchOption.no_soup}
                onChange={_.handleOnOptionChange}
                disabled={_.lunchOption.sub}
            />} label="No Soup"/>
        <FormControlLabel  
            control={<Checkbox 
                name="no_rice"
                checked={_.lunchOption.no_rice}
                onChange={_.handleOnOptionChange}
            />} label="No Rice"/>

    </FormGroup>    
}