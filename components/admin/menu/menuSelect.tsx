import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { isEmpty } from "lodash";
import { handleOnMenuChange, handleOnTabChange } from "../../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store"

export const MenuSelect = () => {
    const menuState = useAppSelector(state => state.menus);
    const dispatch = useAppDispatch();

    const handleOnSelectChange = (e: SelectChangeEvent<string>) => {
        //when the select has change, use the id to locate the selected menu
        const selectedMenu = menuState.menus.find((menu) => menu.id ===  e.target.value);

        // only when the menu is found, dispatch to the store
        if(selectedMenu){
            dispatch(handleOnMenuChange(selectedMenu));
            dispatch(handleOnTabChange(0));
        }
    }
    return <>
        {
            !isEmpty(menuState.currentSelectedMenu) ? <FormControl sx={{ margin: '1.5rem 1rem', minWidth: '250px'}}>
                <InputLabel id="menu-select">Menu</InputLabel>
                <Select
                    labelId="menu-select-label"
                    id="menu-select"
                    value={menuState.currentSelectedMenu.id}
                    label="Menu"
                    onChange={handleOnSelectChange}
                >
                    {
                        menuState.menus.map((menu) => {
                        return <MenuItem key={menu.id} value={menu.id}>{menu.en_name} {menu.ch_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl> : null
        }
    </>
}