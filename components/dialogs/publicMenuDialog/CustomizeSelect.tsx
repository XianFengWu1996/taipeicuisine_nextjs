import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { v4 } from "uuid"
import { ICustomizeItem } from "."

interface ICustomizeSelect {
    title: string,
    original_list: ICustomizeItem[],
    onChange: (arg1: SelectChangeEvent<string>) => void,
}

export const CustomizeSelect = ({ title, original_list, onChange } : ICustomizeSelect) => {
    return  <div>
        <Typography>Extra {title}</Typography>

        <FormControl sx={{ my: 1}}>
        <InputLabel id={`select-label-${title.toLowerCase()}`}>{title}</InputLabel>
        <Select
            labelId={`select-label-${title.toLowerCase()}`}
            id={`select-${title.toLowerCase()}`}
            label={title}
            value={''}
            sx={{ width: '200px'}}
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

        </Select>
        </FormControl>
    </div>
}