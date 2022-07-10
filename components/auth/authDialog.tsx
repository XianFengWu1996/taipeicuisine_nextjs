import { useState } from "react";

import { Dialog, DialogContent } from "@mui/material";
import { AuthCard } from '../auth/authCard'
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setShowLoginDialog } from "../../store/slice/settingSlice";

// import { FacebookLoginButton, GoogleLoginButton, AppleLoginButton } from 'react-social-login-buttons'
// import { handleAppleLogin, handleFacebookLogin, handleGoogleLogin } from "../../utils/functions/auth";
// import { useRouter } from "next/router";

export const AuthDialog = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { show_login_dialog } = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch();
    // const router = useRouter();

    const handleDialogClose = () => {
        dispatch(setShowLoginDialog(false));
    }

    return <Dialog 
                open={show_login_dialog} 
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
                toggleType={() => setIsLogin(!isLogin)}
            />

            {/* <Divider style={{width:'100%'}} />

            <Typography sx={{ my: 1}}>Social Login</Typography> */}

            {/* <div>
                <GoogleLoginButton 
                    style={{ marginBottom: '10px'}} 
                    text={'Log In With Google'} 
                    onClick={() => handleGoogleLogin({ query: router.query})} 
                />
                <FacebookLoginButton 
                    style={{ marginBottom: '10px'}} 
                    text={'Log In With Facebook'}
                    onClick={() => handleFacebookLogin({ query: router.query})} 
                />
                <AppleLoginButton  
                    text="Log In With Apple"
                    onClick={() => handleAppleLogin({ query: router.query})}
                />
            </div> */}
        </DialogContent>
</Dialog>
}

