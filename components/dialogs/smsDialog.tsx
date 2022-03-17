import { Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCodeInput from 'react-verification-code-input';

interface ISmsDialogProps {
    open: boolean,
    handleClose: () => void,
}


// logic (todo)

// check the phone number 
// - if the number is valid (valid, length, or if it's already verified)
// once the button is clicked, if the request is successful, a cookie will be set called c_id
// enable/disable the code input field base on the cookie
// also, once the button is click, toggle to a button which sole job is to display the timer

export const SmsDialog = ({ open, handleClose } : ISmsDialogProps) => {
    const [smsPhone, setSmsPhone] = useState('');

    return <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
    >
        <DialogContent>
            <Typography sx={{ my: 2}}>Add New Phone Number</Typography>

            <div style={{ display: 'flex', margin: '20px 0'}}>
           
            <TextField
                    id="customer_phone" 
                    label="Phone"
                    variant="outlined"
                    fullWidth 
                    type={'tel'}
                    sx={{ letterSpacing: 2.5, flex: 5}}
                    value={smsPhone}
                    onChange={(e) => {
                        setSmsPhone(e.target.value);
                    }}
            />
            
            <SmsVerificationButton />
        
            </div>

            <ReactCodeInput />
        </DialogContent>
    </Dialog>
}

export const SmsVerificationButton = () => {
    const [sent, setSent] = useState(false);

    const [timer, setTimer] = useState(process.env.NEXT_PUBLIC_DEFAULT_TIMER);

    console.log(process.env.NEXT_PUBLIC_DEFAULT_TIMER);

    useEffect(() => {
        console.log('ran');
        let intervalId: ReturnType<typeof setInterval>;
       if(sent){
        intervalId = setInterval(() => {
            if(timer > 1){
                setTimer(prev => prev - 1);
                return;
            } 

            setSent(false); // toggle the button back if the countdown has finished 
            setTimer(process.env.NEXT_PUBLIC_DEFAULT_TIMER); // reset the time

        }, 1000);
       }

       return () => clearInterval(intervalId);

    }, [sent, timer])
    return <>
        {
            !sent ? <Button 
                    sx={{ flex: 3, marginLeft: "5%"}} 
                    variant="outlined"
                    onClick={() => {
                        console.log('clicked')
                        setSent(true)
                    }}
                >Send</Button> 
                : <Button
                    sx={{ flex: 3, marginLeft: "5%"}} 
                    variant="outlined"
                >
                {timer}s
            </Button>
        }
    </>
}