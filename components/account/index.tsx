import { Typography } from "@mui/material"
import { useAppSelector } from "../../store/store"
import { AccountChangeAddress } from "./changeAddress"
import { AccountChangeName } from "./changeName"
import { AccountChangePassword } from "./changePassword"
import { AccountChangePhone } from "./changePhone"

export const AccountRelatedPage = () => {
    const { name, phone } = useAppSelector(state => state.customer)
    return <>
        <div>
            <Typography variant="h4">Account</Typography>

            <AccountChangeName name={name} />

            <AccountChangePhone phone={phone} />

            <AccountChangeAddress />

            <AccountChangePassword />
        </div>
    </>
}