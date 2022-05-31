import { Typography } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { NotAuthorizeError } from "../../utils/errors/custom"
import { getCustomerInfo } from "../../utils/functions/account"
import { fbAuth } from "../../utils/functions/auth"
import { AccountChangeAddress } from "./changeAddress"
import { AccountChangeName } from "./changeName"
import { AccountChangePassword } from "./changePassword"
import { AccountChangePhone } from "./changePhone"

export const AccountRelatedPage = () => {
    const [customer, setCustomer] = useState<ICustomer | null>(null);
    useEffect(() => {
        onAuthStateChanged(fbAuth, async user => {
            if(!user){
                throw new NotAuthorizeError();
            }

           let customer_result = await getCustomerInfo(await user?.getIdToken());
            setCustomer(customer_result);
        })
    }, [])

    return <>
        {
            customer && <div>
                <Typography variant="h4">Account</Typography>

                <AccountChangeName name={customer.name} />

                <AccountChangePhone phone={customer.phone} />

                <AccountChangeAddress />

                <AccountChangePassword />
            </div>
        }
    </>
}