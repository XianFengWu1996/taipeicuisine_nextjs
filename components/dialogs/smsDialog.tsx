import { Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ReactCodeInput from 'react-verification-code-input';
import { setShowSmsDialog } from "../../store/slice/settingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { sentCode, handleCodeVerify} from "../../utils/functions/phone";
// logic (todo)

// check the phone number 
// - if the number is valid (valid, length, or if it's already verified)
// once the button is clicked, if the request is successful, a cookie will be set called c_id
// enable/disable the code input field base on the cookie
// also, once the button is click, toggle to a button which sole job is to display the timer

export const SmsDialog = () => {
    const { show_sms_dialog} = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch();

    const [smsPhone, setSmsPhone] = useState('');

    const handlePhoneOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // limits the length to 10
        if(e.target.value.length <= 10){
            setSmsPhone(e.target.value);
        }

    }

    return <Dialog
        open={show_sms_dialog}
        onClose={() => dispatch(setShowSmsDialog(false))}
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
                    onClick={() => {
                        sentCode({
                            phone: phone,
                            handleStartLoading: () => setSent(true),
                        })
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