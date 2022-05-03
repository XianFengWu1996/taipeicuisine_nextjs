import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { ReactNode } from "react"
import { v4 } from "uuid"

interface ICustomizeSelect {
    title: string,
    original_list: ICustomizeItem[],
    onChange: (event: SelectChangeEvent<unknown>, child: ReactNode) => void,
}

const CustomizeSelectComp = styled(Select)(({theme}) => ({
    width: '200px',
    [theme.breakpoints.down('sm')]: {
        width: '125px'
    }
}))

export const CustomizeSelect = ({ title, original_list, onChange } : ICustomizeSelect) => {
    return  <div>
        <Typography>Extra {title}</Typography>

        <FormControl sx={{ my: 1}}>
        <InputLabel id={`select-label-${title.toLowerCase()}`}>{title}</InputLabel>
        <CustomizeSelectComp
            labelId={`select-label-${title.toLowerCase()}`}
            id={`select-${title.toLowerCase()}`}
            label={title}
            value={''}
            onChange={onChange}
        >
            {
                original_list.map((item) => {
                    return <MenuItem
                        key={v4()} 
                        value={item.id}>
                        {item.en_name} {item.ch_name}  + ${item.price}</MenuItem>
                })
            }

        </CustomizeSelectComp>
        </FormControl>
    </div>
}