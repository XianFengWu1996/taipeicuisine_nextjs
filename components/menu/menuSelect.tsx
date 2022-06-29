import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Typography, useMediaQuery } from "@mui/material"
import { isEmpty } from "lodash";
import { FaSearch } from "react-icons/fa";
import { handleOnMenuChange, handleOnTabChange } from "../../store/slice/menuSlice";
import { setShowSearchBar } from "../../store/slice/settingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { SearchBar } from "../navigation/appbar/searchBar";

const MenuSelectFormControl = styled(FormControl)(({theme}) => ({
    margin: '1.5rem 5rem',

    [theme.breakpoints.down('md')]: {
        margin: '1.5rem 3rem',    },
    [theme.breakpoints.down('sm')]: {
        margin: '1.5rem 1.5rem',
    }
}))

const MenuSelectComponent = styled(Select)(({ theme }) => ({
     minWidth: '25vw',
     [theme.breakpoints.down('md')]: {
        minWidth: '60vw',
    },
    [theme.breakpoints.down('sm')]: {
        width: '60vw'
    }
}))

export const MenuSelect = () => {
    const menuState = useAppSelector(state => state.menus);
    const { show_search_bar } = useAppSelector(state => state.setting);
    const dispatch = useAppDispatch();

    const isMobile = useMediaQuery('(max-width: 720px)'); // check if it' mobile 

    const handleOnSelectChange = (e: SelectChangeEvent<unknown | string>) => {
        //when the select has change, use the id to locate the selected menu
        const selectedMenu = menuState.menus.find((menu) => menu.id ===  e.target.value);

        // only when the menu is found, dispatch to the store
        if(selectedMenu){
            dispatch(handleOnMenuChange(selectedMenu));
            dispatch(handleOnTabChange({ tabIndex: 0, category: selectedMenu.category[0] }));
        }
    }
    return <>
        { show_search_bar && <SearchBar /> }

        {
            !isEmpty(menuState.selectedMenu) && 
            <div style={{ display: 'flex', alignItems: 'center'}}>
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
            </div>
        }

    </>
}