import { InputAdornment, TextField } from "@mui/material"
import { ChangeEvent, ReactElement } from "react"

interface IAuthTextFieldProps {
    type: string, 
    name: string, 
    label: string,
    value: string, 
    onChange: (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    icon: ReactElement<any>
}

export const AuthTextField = (props : IAuthTextFieldProps) => {
    return <TextField
    type={props.type}
    aria-label={props.name}
    variant="outlined"
    label={props.label}
    placeholder={props.label}
    name={props.name}
    required
    sx={{ marginY: 1.5}}
    value={props.value}
    onChange={props.onChange}
    InputProps={{ 
        startAdornment: (
            <InputAdornment position="start">
              {props.icon}
            </InputAdornment>
        )
    }}
/>
}