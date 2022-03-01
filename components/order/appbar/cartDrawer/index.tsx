import { Button, SwipeableDrawer, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useAppSelector } from "../../../../store/store"
import { CartDrawerActions } from "./cartDrawerActions"
import { CartDrawerList } from "./cartDrawerList"

interface ICartDrawerProps {
    open:boolean, 
    handleOpen: () => void,
    handleClose: () => void,
}


export const CartDrawer = (props: ICartDrawerProps) => {
    const cartState = useAppSelector(state => state.cart)
    return <SwipeableDrawer
              anchor='right'
              open={props.open}
              onClose={props.handleClose}
              onOpen={props.handleOpen}
        >
            <Box sx={{ 
                width: '450px', 
                height: cartState.cart.length < 4 ? '100%':'auto',
                backgroundColor: '#ecf2ff',
            }}>
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
            </Box>
        </SwipeableDrawer>
}

