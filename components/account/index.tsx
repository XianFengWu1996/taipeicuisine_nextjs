import { Typography } from "@mui/material"
import { AccountChangeAddress } from "./changeAddress"
import { AccountChangeName } from "./changeName"
import { AccountChangePassword } from "./changePassword"
import { AccountChangePhone } from "./changePhone"

export const AccountRelatedPage = () => {
    return <>
        <div>
            <Typography variant="h4">Account</Typography>

            <AccountChangeName name="Shawn" />

            <AccountChangePhone phone="9175787352"/>

            <AccountChangeAddress />

            <AccountChangePassword />
        </div>
    </>
}