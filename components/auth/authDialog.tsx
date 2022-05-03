import { useState } from "react";

import { Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { AuthCard } from '../auth/authCard'
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLoginDialog } from "../../store/slice/customerSlice";

import { FacebookLoginButton, GoogleLoginButton, AppleLoginButton } from 'react-social-login-buttons'


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

            <Typography sx={{ my: 1}}>Social Login</Typography>

            <div>
                <GoogleLoginButton style={{ marginBottom: '10px'}} onClick={() => {
                    
                }}>
                    <Typography>Log In With Google</Typography>
                </GoogleLoginButton>
                <FacebookLoginButton style={{ marginBottom: '10px'}}>
                    <Typography>Log In With Facebook</Typography>
                </FacebookLoginButton>
                <AppleLoginButton>
                    <Typography>Log In With Apple</Typography>
                </AppleLoginButton>
            </div>
        </DialogContent>
</Dialog>
}

