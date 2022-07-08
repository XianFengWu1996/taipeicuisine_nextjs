import { Button, Dialog, DialogContent, TextField, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactCodeInput from 'react-verification-code-input';
import { setShowSmsDialog } from "../../../../store/slice/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { handleCodeVerify, sentCode } from "../../../../utils/functions/phone";

// check the phone number 
// - if the number is valid (valid, length, or if it's already verified)
// once the button is clicked, if the request is successful, a cookie will be set called c_id
// enable/disable the code input field base on the cookie
// also, once the button is click, toggle to a button which sole job is to display the timer

const PhoneInputContainer = styled('div')(({ theme }) => ({
    display: 'flex', 
    margin: '20px 0',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column', 
    }
}))

export const SmsDialog = () => {
    const { show_sms_dialog} = useAppSelector(state => state.setting)
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width: 720px)'); // check if it' mobile 


    const [smsPhone, setSmsPhone] = useState('');
    const [sent, setSent] = useState<boolean>(false); // this will handle the button and timer

    const handlePhoneOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // limits the length to 10
        if(e.target.value.length <= 10){
            setSmsPhone(e.target.value);
        }

    }


    return <Dialog
        open={show_sms_dialog}
        onClose={() => {
            dispatch(setShowSmsDialog(false))
            setSent(false);
            setSmsPhone('');
        }}
        maxWidth="sm"
        fullWidth
        
>
        <DialogContent>
            <Typography sx={{ my: 2}}>Add New Phone Number</Typography>

            <PhoneInputContainer>
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
                
                <SmsVerificationButton phone={smsPhone} sent={sent} setSent={setSent}/>
        
            </PhoneInputContainer>

            <Typography>Enter Verification Code</Typography>
            <ReactCodeInput  onComplete={handleCodeVerify} fieldHeight={isMobile ? 40 : 60} fieldWidth={isMobile ? 40 : 60}/> 
        </DialogContent>
    </Dialog>
}

interface ISmsVerificationButton {
    phone: string,
    sent: boolean,
    setSent:Dispatch<SetStateAction<boolean>>
}

export const SmsVerificationButton = ({phone, sent, setSent}: ISmsVerificationButton) => {
    const SentButton = styled(Button)(({ theme }) => ({
        flex: 3, 
        marginLeft: 30,

        [theme.breakpoints.down('sm')]:{
            marginLeft: 0,
            marginTop: 10
        }
    }))

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

    }, [sent, timer, setSent])

    return <>
        {
            !sent ? <SentButton 
                    variant="outlined"
                    onClick={() => {
                        sentCode({
                            phone: phone,
                            handleStartLoading: () => setSent(true),
                        })
                    }}
                >Send</SentButton> 
                : <SentButton variant="outlined">{timer}s
            </SentButton>
        }
    </>
}