import { Paper, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { SyntheticEvent, useEffect, useState } from "react";
import { MenuItemList } from "./menuItem";

interface IProps {
    menus: IMenu[],
    menuSelect: string,
    tabValue: number,
    handleTabChange: (_:SyntheticEvent<Element, Event>, v: number) => void
}

export const MenuTab = (props: IProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    let currentlySelected: IMenu | undefined;


    // handles getting the scroll position
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    // rendering correct tab base on the menu 
    const handleTabView = () => {
        currentlySelected = props.menus.find(el => el.en_name === props.menuSelect);        
        return currentlySelected?.category.map((category) => {
            return <Tab
                key={category.id} 
                label={category.en_name} 
                id={`tab-${props.tabValue}`} 
            />
        })
    }
    
    // rendering the tab children base on the selected menu and selected tab
    const handleTabChildren = () => {
        if(currentlySelected){
            return <MenuItemList list={currentlySelected?.category[props.tabValue].dishes}/>
        }
    }
    
    const scrollBarStyle:React.CSSProperties | undefined = {
        position: scrollPosition > 175 ? 'fixed' : 'relative',
        top: scrollPosition > 175 ? 0 : undefined,
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return  <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', minHeight: '90vh' }}
         >   
            <Paper style={ scrollBarStyle}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={props.tabValue}
                    onChange={props.handleTabChange}
                    aria-label="Menu Display"
                    sx={{ borderRight: 1, borderColor: 'divider', padding: '0 3rem' }}
                >
                {handleTabView()}
                </Tabs>
            </Paper>

            {handleTabChildren()}
        </Box>
}