import { AppBar, Button, IconButton, Toolbar, useMediaQuery } from "@mui/material"
import { Box, styled } from "@mui/system"
import MenuIcon from '@mui/icons-material/Menu';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import BlackLogo from '../../../assets/images/blacklogo.png'
import Image from "next/image";
import { useState } from "react";
import { useAppSelector } from "../../../store/store";
import { MenuDrawer } from "../menuDrawer/menuDrawer";
import { CartDrawer } from "../checkoutDrawer";
import { useRouter } from "next/router";


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
    [theme.breakpoints.down('md')]: {
        padding: '0 10px',
    },
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



export const PublicAppBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const cart = useAppSelector(state => state.cart);

    const isCheckout = useRouter().pathname === '/order/checkout';

    const isMobile = useMediaQuery('(max-width: 480px)');

    const handleMenuOpen = () => {
        setMenuOpen(true)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
    }

    const handleCartOpen = () => {
        setCartOpen(true)
    }

    const handleCartClose = () => {
        setCartOpen(false)
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
                    {!isMobile && <Image src={BlackLogo.src} alt="taipei cuisine logo" width={60} height={50}/>  }
                </div>
                <div style={{ display: 'flex'}}>
                    {/* {!isMobile && <IconButton sx={{ marginRight: 4 }}>
                        <AiOutlineUser />
                    </IconButton> 
                    } */}
                    {
                        !isCheckout && <CartButton onClick={handleCartOpen}> 
                            <AiOutlineShoppingCart />
                            <CartCount>{cart.cart_quantity}</CartCount>
                        </CartButton>
                    }
                </div>
            </Toolbar>
            </StyleAppbar>
        </Box>

        <MenuDrawer open={menuOpen} handleOpen={handleMenuOpen} handleClose={handleMenuClose}/>
        <CartDrawer open={cartOpen} handleOpen={handleCartOpen} handleClose={handleCartClose}/>
    </>
}
