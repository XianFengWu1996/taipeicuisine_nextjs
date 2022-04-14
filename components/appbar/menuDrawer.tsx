import { Button, IconButton, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, TextField, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import Router from "next/router";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineSetting, AiOutlineHome, AiOutlineClose } from 'react-icons/ai'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import {MdOutlineRestaurantMenu } from 'react-icons/md'
import { setLoginDialog } from "../../store/slice/customerSlice";
import { useAppDispatch } from "../../store/store";

import { onAuthStateChanged, User } from 'firebase/auth'
import { fbAuth, handleLogout } from "../../utils/functions/auth";
import {  useEffect, useState } from "react";
import snackbar from "../snackbar";

interface IMenuDrawerProps {
    open: boolean,
    handleOpen: () => void,
    handleClose: () =>  void,
}

const DrawerItem = styled('div')(({theme}) => ({
    width: '250px'
}))

const SignInLogoutButton = styled(Button)(({theme}) => ({
    width: '80%',
    alignSelf: 'center',
}))


export const MenuDrawer = (props: IMenuDrawerProps) => {
    const isMobile = useMediaQuery('(max-width: 480px)');
    const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>();
  
    useEffect(() => {
        const subscribe = onAuthStateChanged(fbAuth, async fbUser => {
            setUser(fbUser);
            if(!fbUser){
                setUser(null);
           } else {
               setUser(fbUser)
           }
        });

        return () => {
            subscribe();
        }
    }, [])


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
            text: 'Checkout',
            icon: <AiOutlineShoppingCart />,
            path: '/order/checkout'
        },
        user ? {
            id: 'beb85444-bccf-4f34-90ca-ac274b086950',
            text: 'Order',
            icon: <HiOutlineReceiptTax />,
            path: '/history'
        } : null,
        user ? {
            id: '38d4df12-3c06-4c9b-90de-c1d79152fe3d',
            text: 'Setting',
            icon: <AiOutlineSetting />,
            path: '/setting'
        } : null,
    ]

    const handleSigninLogout = () => {
        if(user){
            handleLogout();
            props.handleClose()
            snackbar.warning("You've logged out")
        } else {
            dispatch(setLoginDialog(true))
            props.handleClose()
        }
    }

    return <SwipeableDrawer
        anchor='left'
        open={props.open}
        onClose={props.handleClose}
        onOpen={props.handleOpen}
    >
        <div>
            <IconButton sx={{ padding: '20px'}} onClick={props.handleClose}>
                <AiOutlineClose />
            </IconButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80%'}}>
            <div>
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
                        if(item){
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
                        } 
                        return null;
                    })
                }
            </div>
        

            <SignInLogoutButton variant="contained" onClick={handleSigninLogout}>
                { user ? 'Logout' : 'Login'} 
            </SignInLogoutButton>
        </div>   
    </SwipeableDrawer>
}