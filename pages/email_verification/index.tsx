import { Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, User, sendEmailVerification } from "firebase/auth"
import { useEffect, useState } from "react"
import { PublicAppBar } from "../../components/navigation/appbar/appbar";
import snackbar from "../../components/snackbar";
import { NotAuthorizeError } from "../../utils/errors/notAuthError";
import { fbAuth } from "../../utils/functions/auth"

export default function EmailVerification() {
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    

    const isEmailVerified = (user:User | null) => {
        return user?.providerData[0].providerId === 'password' && user.emailVerified 
    }
 
    useEffect(() => {
        onAuthStateChanged(fbAuth, async user => {
            if(!user){
                throw new NotAuthorizeError();
            }

            setVerified(isEmailVerified(user))
        })
    }, [])

    const handleSendVerifyEmail = async() => {
        try {
            if(fbAuth.currentUser){
                await sendEmailVerification(fbAuth.currentUser);
                snackbar.success('Email has been sent, please check spam folder as well')
            }
        } catch (error) {
            if((error as Error).name === 'FirebaseError'){
                if((error as FirebaseError).code === 'auth/too-many-requests'){
                    return setError('Please check your inbox or spam folder first, and wait a few minutes to make another request')
                }
            }

            setError((error as Error).message ?? 'Failed to send verification email')
        }
    }

    return <>
        <PublicAppBar />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            {
                verified ? <Typography>You are already verified</Typography> 
                : <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <Typography>To access all the functionality such as checkout, please verify your email</Typography>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 1, backgroundColor: blue[400]}}
                        onClick={handleSendVerifyEmail}
                    >Verify Now</Button>
                    {
                        error && <Typography sx={{ color: 'red'}}>{error}</Typography>
                    }
                </div>
            }
        </div>
    </>
}
