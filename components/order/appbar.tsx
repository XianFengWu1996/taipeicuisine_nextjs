import { AppBar, Button, IconButton, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography } from "@mui/material"
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
    boxShadow: '3px 3px 6px 0px rgba(0,0,0,0.35)',
    padding: '0 40px',
}))

const CartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    color: '#fff',
    fontSize: 21,
    padding: '10px 40px',
    '&:hover':{
        backgroundColor: '#bbb'
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
    color: '#555'
}))

const DrawerItem = styled('div')(({theme}) => ({
    width: '250px'
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
                        onClick={() => setMenuOpen(true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Image src={BlackLogo.src} alt="taipei cuisine logo" width={60} height={50}/>
                </div>
                <div>
                    <IconButton sx={{ marginRight: 4 }}>
                        <AiOutlineUser />
                    </IconButton>
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
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}
        >
            <div>
                <IconButton>
                    <AiOutlineClose />
                </IconButton>
            </div>
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
        </SwipeableDrawer>
    </>
}