import { Paper, Tab, Tabs } from "@mui/material"
import { Box, styled } from "@mui/system"
import { SyntheticEvent, useEffect, useState } from "react";
import { handleOnTabChange } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { MenuItemList } from "./menuItem";

const StyledMenuTabContainer = styled(Tabs)(({ theme }) => ({
    borderRight: 1, 
    borderColor: 'divider', 
    padding: '0 3rem',
    [theme.breakpoints.down('md')]: {
        padding: '0 2rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0',
    },
}))

const StyledMenuTab = styled(Tab)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        fontWeight: 600
    },
}))

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
                    return <StyledMenuTab
                        key={category.id} 
                        label={`${category.en_name} ${category.ch_name}`} 
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
        zIndex: 1000,
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return  <Box sx={{ bgcolor: 'background.paper' }}>  
            <Paper style={ scrollBarStyle}>
                <StyledMenuTabContainer
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={currentSelectedTab ?? 0  }
                    onChange={handleTabChange}
                    aria-label="Menu Display"
                >
                
                {handleTabView()}
                </StyledMenuTabContainer>
            </Paper>

            {handleTabChildren()}
        </Box>
}