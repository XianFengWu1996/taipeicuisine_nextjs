import { Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ReactCodeInput from 'react-verification-code-input';
import snackbar from "../snackbar";
import { useAppSelector } from "../../store/store";

import Cookies from 'js-cookie'
import { sentCode } from "../../utils/functions/phone";
import axios from "axios";
import { handleAxiosError } from "../../utils/errors/handleAxiosError";
import { fbAuth } from "../../utils/functions/auth";


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

    const handlePhoneOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // limits the length to 10
        if(e.target.value.length <= 10){
            setSmsPhone(e.target.value);
        }

    }

    const handleCodeVerify = async (value: string) => {
        if(!Cookies.get('c_id')){
            return snackbar.warning('The code has expired, please request another code')
        }

        try {
            let fb_token = await fbAuth.currentUser?.getIdToken();

            await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/message/verify`, {
                code: value, 
            }, {
                headers: {
                    'Authorization': `Bearer ${fb_token}`
                }
            });

            snackbar.success('Phone number has been verified');
        } catch (error) {
            if(axios.isAxiosError(error)){
               return handleAxiosError(error);
            }
            snackbar.error('Something unexpected happen, try refresh the page')
        }
    }

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
                    onChange={handlePhoneOnChange}
            />
            
            <SmsVerificationButton phone={smsPhone}/>
        
            </div>

            <Typography>Enter Verification Code</Typography>
            <ReactCodeInput  onComplete={handleCodeVerify} />   
        </DialogContent>
    </Dialog>
}

export const SmsVerificationButton = ({phone} : {phone: string}) => {
    const [sent, setSent] = useState(false);
    const [timer, setTimer] = useState(process.env.NEXT_PUBLIC_DEFAULT_TIMER);
    const { phone_list } = useAppSelector(state => state.customer)

    const handleSentCode = () => {
        sentCode(phone, phone_list, () => {setSent(true)});
    }

    useEffect(() => {
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
                    onClick={handleSentCode}
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