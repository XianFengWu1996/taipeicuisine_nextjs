import { SwipeableDrawer } from "@mui/material"
import { Box } from "@mui/system"

interface ICartDrawerProps {
    open:boolean, 
    handleOpen: () => void,
    handleClose: () => void,
}

export const CartDrawer = (props: ICartDrawerProps) => {
    return <SwipeableDrawer
              anchor='right'
              open={props.open}
              onClose={props.handleClose}
              onOpen={props.handleOpen}
        >
            <Box sx={{ width: '25vw'}}>

            </Box>
        </SwipeableDrawer>
}