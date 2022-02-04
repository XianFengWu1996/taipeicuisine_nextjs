import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

interface IProps {
    value: string, 
    handleChange: (_: SelectChangeEvent) => void,
    menus: IMenu[]
}

export const MenuSelect = (props: IProps) => {
    return <FormControl sx={{ margin: '1.5rem 1rem', minWidth: '250px'}}>
    <InputLabel id="menu-select">Menu</InputLabel>
    <Select
        labelId="menu-select-label"
        id="menu-select"
        value={props.value}
        label="Menu"
        onChange={props.handleChange}
    >
        {
            props.menus.map((menu) => {
               return <MenuItem key={menu.id} value={menu.en_name}>{menu.en_name} {menu.ch_name}</MenuItem>
            })
        }
    </Select>
</FormControl>
}