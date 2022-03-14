import { useState } from "react";

import { Button, Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { AuthCard } from '../auth/authCard'
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLoginDialog } from "../../store/slice/customerSlice";


export const AuthDialog = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { loginDialogOpen } = useAppSelector(state => state.customer)
    const dispatch = useAppDispatch();

    const handleDialogClose = () => {
        dispatch(setLoginDialog(false));
    }

    return   <Dialog 
                open={loginDialogOpen} 
                onClose={handleDialogClose}
                fullWidth
            >
         <DialogContent sx={{ display: 'flex', flexDirection: 'column',}}>
            <AuthCard
                isLogin={isLogin}
                animateVariant={isLogin ? 'show': 'hide'}
                toggleType={() => setIsLogin(!isLogin)} />

            <AuthCard 
                isLogin={isLogin} 
                animateVariant={isLogin ? 'hide': 'show'}
                toggleType={() => setIsLogin(!isLogin)} />

            <Divider style={{width:'100%'}} />

            <Typography>Other Login</Typography>

            <Button sx={{ backgroundColor: 'lightpink', color: '#fff', marginY: 1}}>GOOGLE</Button>
            <Button  sx={{ backgroundColor: 'black',  color: '#fff', marginY: 1}}>APPLE</Button>
            <Button  sx={{ backgroundColor: 'lightblue',  color: '#fff', marginY: 1}}>FACEBOOK</Button>
        </DialogContent>
</Dialog>
}

