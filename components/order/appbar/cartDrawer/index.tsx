import { Button, IconButton, SwipeableDrawer, Typography } from "@mui/material"
import { Box, styled } from "@mui/system"
import { useAppSelector } from "../../../../store/store"
import { CartDrawerActions } from "./cartDrawerActions"
import { CartDrawerList } from "./cartDrawerList"
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { AiOutlineArrowRight, AiOutlineClose, AiOutlineCloseSquare } from "react-icons/ai"

interface ICartDrawerProps {
    open:boolean, 
    handleOpen: () => void,
    handleClose: () => void,
}



export const CartDrawer = (props: ICartDrawerProps) => {
    const cartState = useAppSelector(state => state.cart)

    const CartDrawerContainer = styled(Box)(({ theme }) => ({
        width: '450px', 
        height: cartState.cart.length < 4 ? '100%':'auto',
        backgroundColor: '#ecf2ff',
        [theme.breakpoints.down('sm')] : {
            width: '100vw',
        }
    }))

    return <SwipeableDrawer
              anchor='right'
              open={props.open}
              onClose={props.handleClose}
              onOpen={props.handleOpen}
        >
            <CartDrawerContainer>
                <IconButton sx={{ position: 'absolute', top: 30, left: 10, }} onClick={props.handleClose}>
                    <AiOutlineClose  />
                </IconButton>
                  
                <Typography 
                    sx={{
                        textAlign: 'center',
                        margin: '30px 0',
                        fontSize: '25px',
                        fontWeight: 600
                    }}
                >Cart</Typography>

                <CartDrawerList />

                <CartDrawerActions />
            </CartDrawerContainer>
        </SwipeableDrawer>
}

