import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { ChangeEvent } from "react"

interface ICheckboxListProps {
    dish: IDish,
    handleCheckboxChange: (_:ChangeEvent<HTMLInputElement>) => void
}

export const CheckBoxList = (props: ICheckboxListProps) => {
    return <>
         <FormGroup row>
                <CheckBoxWithLabel
                    label="Spicy"
                    name="is_spicy"
                    checked={props.dish.is_spicy ?? false}
                    onChange={props.handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="In Stock"
                    name="in_stock"
                    checked={props.dish.in_stock ?? false}
                    onChange={props.handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="Popular"
                    name="is_popular"
                    checked={props.dish.is_popular ?? false}
                    onChange={props.handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="Lunch"
                    name="is_lunch"
                    checked={props.dish.is_lunch ?? false}
                    onChange={props.handleCheckboxChange}
                />  
            </FormGroup>
    </>
}

export const CheckBoxWithLabel = (props: ICheckbox) => {
    return <FormControlLabel control={
        <Checkbox
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
        />
    } label={props.label} />
}