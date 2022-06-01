import { Button, Typography } from "@mui/material";
import { setShowSmsDialog } from "../../store/slice/settingSlice";
import { useAppDispatch } from "../../store/store";
import { phoneFormat } from "../../utils/functions/phone";
import { TitleForSection } from "./components";
import { SmsDialog } from '../dialogs/smsDialog'


interface IAccountChangePhone {
    phone: string,
    account: boolean
}

export const AccountChangePhone = (_:IAccountChangePhone) => {
    const dispatch = useAppDispatch();

   return <div style={{  marginTop: '20px' }}>
            <TitleForSection label={'phone'} />
    
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <Typography>
                    {phoneFormat(_.phone)}
                </Typography>

                <Button variant='outlined' sx={{ mx: 3, padding: 0.8}} onClick={() => dispatch(setShowSmsDialog(true)) }>Change Phone</Button>

                <SmsDialog />
            </div>
    </div>
}