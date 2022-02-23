import { Paper, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { SyntheticEvent, useEffect, useState } from "react";
import { handleOnTabChange } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { MenuItemList } from "./menuItem";

export const MenuTab = () => {

    const { currentSelectedMenu, currentSelectedTab} = useAppSelector(state => state.menus);
    const dispatch = useAppDispatch();
    const [scrollPosition, setScrollPosition] = useState(0);

    // handles getting the scroll position
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    // rendering correct tab base on the menu 
    const handleTabView = () => {
        if(currentSelectedMenu) {
            if(currentSelectedMenu.category){
                return currentSelectedMenu.category.map((category) => {
                    return <Tab
                        key={category.id} 
                        label={category.en_name} 
                        id={`tab-${category.id}`} 
                    />
                })
            }
        }
    }
    
    // rendering the tab children base on the selected menu and selected tab
    const handleTabChildren = () => {
        if(currentSelectedMenu){
            return <MenuItemList />   
        }   
    }

    const handleTabChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
        dispatch(handleOnTabChange({ tabIndex: newValue, category: currentSelectedMenu.category[newValue] }));
    }
    
    const scrollBarStyle:React.CSSProperties | undefined = {
        position: scrollPosition > 170 ? 'sticky' : 'relative',
        top: scrollPosition > 170 ? -1 : 0, 
        zIndex: 1000
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return  <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}
         >  
            <Paper style={ scrollBarStyle}>
                <Tabs
                    variant="scrollable"
                    visibleScrollbar
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={currentSelectedTab ?? 0  }
                    onChange={handleTabChange}
                    aria-label="Menu Display"
                    sx={{ borderRight: 1, borderColor: 'divider', padding: '0 3rem' }}
                >
                
                {handleTabView()}
                </Tabs>
            </Paper>

            {handleTabChildren()}
        </Box>
}