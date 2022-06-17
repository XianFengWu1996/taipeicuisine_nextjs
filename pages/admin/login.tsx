import { MouseEventHandler, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import axios from 'axios';
import Router, { useRouter } from 'next/router'
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { handleAdminTryCatchError } from "../../utils/functions/errors";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toggleLoginLoading } from "../../store/slice/adminSlice";
import snackbar from "../../components/snackbar";
import { fbAuth } from "../../utils/functions/auth";

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // redux store 
    const admin = useAppSelector(state => state.admin)
    const dispatch = useAppDispatch();
    // const [loading, setLoading] = useState(false); // move this loading to redux store 

    const login:MouseEventHandler<HTMLButtonElement> | undefined= async (e) => {
        // setLoading(true);
        dispatch(toggleLoginLoading(true))

        if(!admin.login_loading){
            try {
                e.preventDefault();

                let user = await signInWithEmailAndPassword(fbAuth, email, password)
                .catch((_) => {
                    throw new Error('Please check your email or password')
                });

                let token = await user.user.getIdToken();

                await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/admin/login`,{},{
                    headers: { 'authorization': `Bearer ${token}`}
                })

                Router.push('/admin/dashboard')
            } catch (error) {
                signOut(fbAuth); // if the operation failed, sign the user out
                dispatch(toggleLoginLoading(false)); // end loading if error occurs
                handleAdminTryCatchError(error ?? 'Authentication Failed');
            } 
        }
    }

    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;
        if(router.query.redirect){
            snackbar.error('Unauthorize request')
        }
    }, [router.isReady])

    return <>
         <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
            noValidate
            autoComplete="off"
            >
                <TextField 
                    id="outlined-basic-email" 
                    label="Email" 
                    type='email'
                    variant="outlined"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField 
                    id="outlined-basic-password" 
                    label="Password" 
                    type='password'
                    variant="outlined" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <LoadingButton 
                    loading={admin.login_loading} 
                    onClick={login} 
                    variant="contained"
                >
                    Login
                </LoadingButton>
        </Box>
    </> 
}