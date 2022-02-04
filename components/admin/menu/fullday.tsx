import { Category } from "@mui/icons-material";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MenuItemList } from "./menuItem";

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

interface IProps {
    fullday: ICategory[],
}

export const Fullday = (props: IProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [scrollPosition, setScrollPosition] = useState(0);
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
        position: scrollPosition > 70 ? 'fixed' : 'relative',
        top: scrollPosition > 70 ? 0 : undefined,
   }
    

    return <>
    <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', minHeight: '90vh' }}
    >   
        <div>{}</div>
        <div style= {scrollBarStyle}>
            <Paper>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    value={value}
                    onChange={handleChange}
                    aria-label="Menu Category Display"
                    sx={{ borderRight: 1, borderColor: 'divider', padding: '0 3rem' }}
                >
                    {
                        props.fullday.map((category) => {
                            return <Tab key={category.id} label={category.en_name} {...a11yProps(value)} />
                        })
                    }
                </Tabs>
            </Paper>
        </div>
            
        <MenuItemList list={props.fullday[value].dishes} />

    </Box>

    </>
}