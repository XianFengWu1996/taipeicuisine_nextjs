import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, styled } from "@mui/material"
import { isEmpty } from "lodash";
import { handleOnMenuChange, handleOnTabChange } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store"

const MenuSelectFormControl = styled(FormControl)(({theme}) => ({
    margin: '1.5rem 5rem',

    [theme.breakpoints.down('md')]: {
        margin: '1.5rem 3rem',    },
    [theme.breakpoints.down('sm')]: {
        margin: '1.5rem 1.5rem',
    }
}))

const MenuSelectComponent = styled(Select)(({ theme }) => ({
     minWidth: '40vw',
     [theme.breakpoints.down('md')]: {
        minWidth: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
        width: '90vw'
    }
}))

export const MenuSelect = () => {
    const menuState = useAppSelector(state => state.menus);
    const dispatch = useAppDispatch();

    const handleOnSelectChange = (e: SelectChangeEvent<unknown | string>) => {
        //when the select has change, use the id to locate the selected menu
        const selectedMenu = menuState.menus.find((menu) => menu.id ===  e.target.value);

        // only when the menu is found, dispatch to the store
        if(selectedMenu){
            dispatch(handleOnMenuChange(selectedMenu));
            dispatch(handleOnTabChange({ tabIndex: 0 }));
        }
    }
    return <>
        {
            !isEmpty(menuState.selectedMenu) && 
            <MenuSelectFormControl size="medium">
                <InputLabel id="menu-select">Menu 菜单</InputLabel>
                <MenuSelectComponent
                    labelId="menu-select-label"
                    id="menu-select"
                    value={menuState.selectedMenu.id}
                    label="Menu 菜单"
                    onChange={handleOnSelectChange}
                >
                    {
                        menuState.menus.map((menu) => {
                            return <MenuItem key={menu.id} value={menu.id}>{menu.en_name} {menu.ch_name}</MenuItem>
                        })
                    }
                </MenuSelectComponent>
            </MenuSelectFormControl>
        }
    </>
}