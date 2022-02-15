import { TextField } from "@mui/material"
import { ChangeEvent, HTMLInputTypeAttribute } from "react"

interface ITextFieldListProps {
    dish: IDish,
    handleOnChange: (_:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleOnChangeNumber: (_:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export const TextFieldList = (props: ITextFieldListProps) => {
    return <>
            <MenuEditTextField 
                label="Label Id"
                name="label_id"
                value={props.dish.label_id ?? ''}
                onChange={props.handleOnChange}
            />

            <MenuEditTextField 
                label="Dish Name (English)"
                name="en_name"
                value={props.dish.en_name ?? ''}
                onChange={props.handleOnChange}
            />

            <MenuEditTextField 
                label="Dish Name (Chinese)"
                name='ch_name'
                value={props.dish.ch_name ?? ''}
                onChange={props.handleOnChange}
            />

            <MenuEditTextField 
                label="Description"
                name='description'
                value={props.dish.description ?? ''}
                required={false}
                onChange={props.handleOnChange}
            />

            <MenuEditTextField
                label="Price"
                name="price"
                value={props.dish.price.toString() ?? ''}
                type="number"
                onChange={props.handleOnChangeNumber}
            />
    </>
}



export const MenuEditTextField = (props: ITextFieldProps) => {
    return <TextField
        id="outlined-basic"        
        label={props.label} 
        type={props.type ?? 'text'}
        variant="outlined" 
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required ?? true}
        style={{
            marginBottom: 20,
            width: '100%'
        }}
    />
}