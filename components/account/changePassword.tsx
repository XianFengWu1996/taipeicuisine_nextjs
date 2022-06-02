import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { updatePassword } from 'firebase/auth'
import { fbAuth } from "../../utils/functions/auth";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../../store/store";
import { setShowLoginDialog } from "../../store/slice/settingSlice";
import snackbar from "../snackbar";

export const AccountChangePassword = () => {
    const [new_password, setNewPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const [need_auth, setNeedAuth] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleChangePassword = async () => {
        try {
            if((new_password === confirm) && fbAuth.currentUser){
                await updatePassword(fbAuth.currentUser, new_password)
            }
        } catch (error) {
            if((error as Error).name === 'FirebaseError' && (error as FirebaseError).code === 'auth/requires-recent-login'){
                setNeedAuth(true);
                snackbar.error('Sensitive action required recent logins, please reauthenticate.')
            }
        }
    }

    const handleReauthenticate = () => {
        fbAuth.signOut() // signout
        dispatch(setShowLoginDialog(true)); // show the login dialog 
    }

    return <div style={{  marginTop: '20px', width: '400px'}}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>Change Password</Typography>
        <div>
            <TextField 
                value={new_password}
                label={'New Password'}
                type={'password'}
                variant='outlined'
                size='small'
                fullWidth
                sx={{ display: 'block', my: 1}}
                onChange={(e) => {
                    setNewPassword(e.target.value)
                }}
            />
            <TextField 
                value={confirm}
                label={'Confirm New Password'}
                variant='outlined'
                type={'password'}
                size='small'
                fullWidth
                sx={{ display: 'block', my: 1}}
                onChange={(e) => {
                    setConfirm(e.target.value)
                }}
            />
        </div>
        <Button variant='outlined' sx={{ my: 1}} onClick={handleChangePassword}>Change Password</Button>

        {
            need_auth && <Button onClick={handleReauthenticate}>Reauthenticate</Button>
        }
        <Button onClick={handleReauthenticate}>Reauthenticate</Button>
    </div>
}