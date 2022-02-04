import { Paper, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import React, { useEffect } from "react";
import { MenuItemList } from "../../components/admin/menu/menuItem";
import { MenuSelect } from "../../components/admin/menu/menuSelect";
import ResponsiveAppBar from "../../components/appbar";

interface IProps {
    menus: IMenu[],
    error?: {
        msg: string
    }
}

export default function Menu (props:IProps){
    const [menu, setMenu] = React.useState(props.menus[0].en_name);
    const [tabValue, setTabValue] = React.useState(0);
    const [scrollPosition, setScrollPosition] = React.useState(0);

    let currentlySelected: IMenu | undefined;

    // handles if the user change the menu
    const handleMenuChange = (_: SelectChangeEvent) => {
      setMenu(_.target.value);
    };

    // handles if the user change the tab
    const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
      setTabValue(newValue);
    };

    // rendering correct tab base on the menu 
    const handleTabView = () => {
        currentlySelected = props.menus.find(el => el.en_name === menu);        
        return currentlySelected?.category.map((category) => {
            return <Tab 
                key={category.id} 
                label={category.en_name} 
                id={`tab-${tabValue}`} 
            />
        })
    }

    // rendering the tab children base on the selected menu and selected tab
    const handleTabChildren = () => {
        if(currentlySelected){
            return <MenuItemList list={currentlySelected?.category[tabValue].dishes}/>
        }
    }

    // handles getting the scroll position
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

   const scrollBarStyle:React.CSSProperties | undefined = {
        position: scrollPosition > 175 ? 'fixed' : 'relative',
        top: scrollPosition > 175 ? 0 : undefined,
   }

    return <div>
        <ResponsiveAppBar />
        <MenuSelect 
            value={menu}
            handleChange={handleMenuChange}
            menus={props.menus}
        />

        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', minHeight: '90vh', marginBottom: '4rem' }}
         >   
            <Paper style={ scrollBarStyle} sx={{ marginBottom: '20px'}}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="Menu Display"
                    sx={{ borderRight: 1, borderColor: 'divider', padding: '0 3rem' }}
                >
                {handleTabView()}
                </Tabs>
            </Paper>

            {handleTabChildren()}

        </Box>
        
    </div>
}

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try{        
        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/store/menus');

        if(response.status !== 200){
            throw new Error('Failed to get store data')
        }

        let menus: IMenu[] = [];
        menus.push(response.data.special);
        menus.push(response.data.fullday);
        menus.push(response.data.lunch);

        return {
            props: {
                menus
            }
        }      
    } catch (error) {
        return {
            props: {
                error: {
                    msg: (error as Error).message ?? 'Authentication fail'
                }
            }
        }
    }
}