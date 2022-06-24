import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { handleCatchError } from "../../utils/errors/custom";
import { handleForgotPassword } from "../../utils/functions/auth";
import snackbar from "../snackbar";

export const ForgotPassword = () => {  
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
      
       return <div style={{ margin: '20px 0'}}>
            <Typography>Enter email associate with your account</Typography>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <TextField
                    label={'Email'}
                    size={'small'}
                    sx={{ width: '75%', my:1, mr:1}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    sx={{ minWidth: '100px'}}
                    variant="outlined" 
                    onClick={() => {
                        try {
                            setLoading(true);
                            handleForgotPassword(email)
                            snackbar.success('Password reset email has been sent to your email, remember to double check spam folder as well.')
                            setEmail('');
                        } catch (error) {
                            handleCatchError(error as Error, 'Fail to sent forget password link')
                        } finally {
                            setLoading(false);
                        }
                    }}>
                    {loading ? <PulseLoader size={5} color='red'/> : 'Submit'}
                </Button>
            </div>
        </div>
    }