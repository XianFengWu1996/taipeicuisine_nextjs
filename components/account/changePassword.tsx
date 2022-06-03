import { Button, FormControl, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { updatePassword } from 'firebase/auth'
import { fbAuth } from "../../utils/functions/auth";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../../store/store";
import { setShowLoginDialog } from "../../store/slice/settingSlice";
import snackbar from "../snackbar";
import { Box } from "@mui/system";
import { isEmpty } from "lodash";

export const AccountChangePassword = () => {
    const [new_password, setNewPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const [show_password, setShowPassword] = useState(false);

    const [need_auth, setNeedAuth] = useState<boolean>(false);
    const [error, setError]= useState<string>('');

    const dispatch = useAppDispatch();

    const checkForStrongPassword = (password: string) => {
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        return regularExpression.test(password);
    } 

    const handleChangePassword = async () => {
        try {
            setError('');
            if(isEmpty(new_password) ||  isEmpty(confirm)){
                return setError('Please fill out the required fields')
            }

            if(new_password !== confirm){
                return setError('The password does not match');
            }

            if(!checkForStrongPassword(new_password)){
                return setError('Password must have at least 8 character, and must contain at least an uppercase letter, a lowercase letter, a number, and a symbol (!@#$%^&*)');
            }

            await updatePassword(fbAuth.currentUser!, new_password)
            snackbar.success('Password has been updated')
            setNewPassword('')
            setConfirm('')
            setError('');
            setShowPassword(false);
            setNeedAuth(false);
            
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

    return <div style={{  width: '400px'}}>
        <Box sx={{ display: 'flex', my: 1}}>
            <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>Change Password</Typography>
            <Button 
                variant='text' 
                size='small' 
                sx={{ fontSize: 10}}
                onClick={() =>  setShowPassword(!show_password)}
            >Show Password</Button>
        </Box>
        
        <div>
            <FormControl sx={{ display: 'flex'}}>

           <div>
                <TextField 
                    id="new_password"
                    value={new_password}
                    label={'New Password'}
                    type={show_password ? 'text': 'password'}
                    size='small'
                    required
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}
                />
           {
               !isEmpty(error) &&  <Typography sx={{ fontSize: 11, color: 'red', mt: 0.7}}>{error}</Typography>
           }

           </div>

            </FormControl>

            <TextField 
                value={confirm}
                label={'Confirm New Password'}
                variant='outlined'
                type={show_password ? 'text': 'password'}
                size='small'
                fullWidth
                required
                sx={{ my: 1}}
                onChange={(e) => {
                    setConfirm(e.target.value)
                }}
            />
        </div>
        <Button variant='outlined' sx={{ my: 1}} onClick={handleChangePassword}>Change Password</Button>

        {
            need_auth && <Button onClick={handleReauthenticate}>Reauthenticate</Button>
        }
    </div>
}