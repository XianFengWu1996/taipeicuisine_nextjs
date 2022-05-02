import { Paper, Tab, Tabs } from "@mui/material"
import { Box, styled } from "@mui/system"
import { SyntheticEvent, useEffect, useState } from "react";
import { handleOnTabChange } from "../../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { MenuItemList } from "../MenuTab/MenuList";

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
    // handles getting the scroll position
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

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

    const { selectedMenu, selectedTab} = useAppSelector(state => state.menus);
    const dispatch = useAppDispatch();
    const isPopularMenu = selectedMenu.id === 'ca9fe450-064c-4f9c-b3b0-8ead68d88822'

    const handleTabChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
        dispatch(handleOnTabChange({ tabIndex: newValue, category: selectedMenu.category[newValue] }));
    }
    
    return <>
    
        {
            !isPopularMenu ?  <Box sx={{ bgcolor: 'background.paper' }}>  
            <Paper style={ scrollBarStyle}>
                <StyledMenuTabContainer
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={selectedTab}
                    onChange={handleTabChange}
                    aria-label="Menu Display"
                >
                {
                    selectedMenu.category && selectedMenu.category.map((category) => {
                        return  <StyledMenuTab
                                key={category.id}
                                label={`${category.en_name} ${category.ch_name}`} 
                                id={`tab-${category.id}`} 
                            />
                    })
                }

                </StyledMenuTabContainer>
            </Paper>
                <MenuItemList />   
            </Box> 
            :  <MenuItemList />   

        }
    </>
}