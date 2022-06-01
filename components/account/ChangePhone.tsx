import { Button, Typography } from "@mui/material";
import { setShowSmsDialog } from "../../store/slice/settingSlice";
import { useAppDispatch } from "../../store/store";
import { phoneFormat } from "../../utils/functions/phone";
import { TitleForSection } from "./components";
import { SmsDialog } from '../dialogs/smsDialog'
import { isEmpty } from "lodash";


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
                    {isEmpty(_.phone) ? 'Please add phone number': phoneFormat(_.phone)}
                </Typography>

                <Button variant='outlined' sx={{ mx: 3, padding: 0.8}} onClick={() => dispatch(setShowSmsDialog(true)) }>{isEmpty(_.phone) ? 'Add Phone' : 'Change Phone'}</Button>

                <SmsDialog />
            </div>
    </div>
}