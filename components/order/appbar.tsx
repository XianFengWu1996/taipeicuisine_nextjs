import { AppBar, Button, IconButton, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { Box, styled } from "@mui/system"
import MenuIcon from '@mui/icons-material/Menu';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineSetting, AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import {MdOutlineRestaurantMenu } from 'react-icons/md'
import BlackLogo from '../../assets/images/blacklogo.png'
import Image from "next/image";
import { useState } from "react";
import Router from "next/router";

const StyleAppbar = styled(AppBar)(({theme}) => ({
    position: 'static',
    backgroundColor: '#fff',
    color: '#555',
    width: '100%',
    boxShadow: '3px 3px 6px 0px rgba(0,0,0,0.35)',
    padding: '0 40px',
    [theme.breakpoints.down('md')]: {
        padding: '0 20px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px',
    }
}))

const CartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    color: '#fff',
    fontSize: 21,
    padding: '10px 40px',
    '&:hover':{
        backgroundColor: '#bbb'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        padding: '10px 30px',
    }
}))

const CartCount = styled('span')(({theme}) => ({
    position: "absolute",
    fontSize: '10px',
    height: '18px',
    width: '18px',
    top: '3px', 
    right: '29px',
    border: '1px solid #fff',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#555',
    [theme.breakpoints.down('sm')]: {
        height: '14px',
        width: '14px',
        fontSize: '7px',
        top: '2px', 
        right: '22px',
    }
}))

const DrawerItem = styled('div')(({theme}) => ({
    width: '250px'
}))

const LogoutButton = styled(Button)(({theme}) => ({
    backgroundColor: 'red',
    color: '#fff',
    width: '80%',
    alignSelf: 'center',
    '&:focus': {
        backgroundColor: '#ff7f7f   '
    }
}))

const navigation_list = [
    {
        id: '4c5a3c95-74dc-44f8-804f-b4a8bfb4141d',
        text: 'Home',
        icon: <AiOutlineHome />,
        path: '/'
    },
    {
        id: '4a6db2eb-f038-4c78-8079-82ef5b958273',
        text: 'Menu',
        icon: <MdOutlineRestaurantMenu />,
        path: '/order'
    },
    {
        id: '8a7d5046-0247-43a3-b6d8-f4a295cfa05d',
        text: 'Cart',
        icon: <AiOutlineShoppingCart />,
        path: '/cart'
    },
    {
        id: 'beb85444-bccf-4f34-90ca-ac274b086950',
        text: 'Order',
        icon: <HiOutlineReceiptTax />,
        path: '/history'
    },
    {
        id: '38d4df12-3c06-4c9b-90de-c1d79152fe3d',
        text: 'Setting',
        icon: <AiOutlineSetting />,
        path: '/setting'
    },
]


export const PublicAppBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 480px)');

    const handleMenuOpen = () => {
        setMenuOpen(true)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
    }

    return <>
        <Box>
            <StyleAppbar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    {!isMobile ? <Image src={BlackLogo.src} alt="taipei cuisine logo" width={60} height={50}/> : null }
                </div>
                <div>
                    {!isMobile 
                    ? <IconButton sx={{ marginRight: 4 }}>
                        <AiOutlineUser />
                    </IconButton> 
                    : null }
                    <CartButton> 
                        <AiOutlineShoppingCart />
                        <CartCount>25</CartCount>
                    </CartButton>
                </div>
            </Toolbar>
            </StyleAppbar>
        </Box>

        <SwipeableDrawer
            anchor='left'
            open={menuOpen}
            onClose={handleMenuClose}
            onOpen={handleMenuOpen}
        >
            <div>
                <IconButton sx={{ padding: '20px'}} onClick={handleMenuClose}>
                    <AiOutlineClose />
                </IconButton>
            </div>
        
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80%'}}>
                <div >
                    {
                        isMobile ? <DrawerItem>
                            <ListItem button onClick={() => Router.push('/account') }>
                                <ListItemIcon>
                                    <AiOutlineUser />
                                </ListItemIcon>
                                <ListItemText primary={'Account'} />
                            </ListItem>
                        </DrawerItem> : null
                    }
                    {
                        navigation_list.map((item) => {
                            return <DrawerItem key={item.id}>
                                <ListItem button onClick={() => {
                                    Router.push(item.path);
                                }}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </DrawerItem>
                        })
                    }
                </div>
            

                <LogoutButton>
                    Logout
                </LogoutButton>
            </div>
            
        </SwipeableDrawer>
    </>
}