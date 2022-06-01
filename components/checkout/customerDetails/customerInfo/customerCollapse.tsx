import { Collapse } from "@mui/material";
import { Box } from "@mui/system";
import {  useAppSelector } from "../../../../store/store";
import { SmsDialog } from "../../../dialogs/smsDialog";
import { AccountChangeName } from "../../../account/changeName";
import { AccountChangePhone } from "../../../account/changePhone";


export const CustomerCardCollaspe = () => {

    const { name, phone } = useAppSelector(state => state.customer);
    const { show_customer_card} = useAppSelector(state => state.setting)

    return <Collapse in={show_customer_card} timeout="auto" unmountOnExit>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {my: 1, width: '95%'},
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
            <AccountChangeName name={name} account={false} />
            <AccountChangePhone phone={phone} />
        </Box>

        <SmsDialog />
    </Collapse>
}


