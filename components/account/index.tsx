import { Typography } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import Router from "next/router"
import { useEffect, useState } from "react"
import { getCustomer } from "../../store/slice/customerSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { handleCatchError } from "../../utils/errors/custom"
import { getCustomerInfo } from "../../utils/functions/account"
import { fbAuth } from "../../utils/functions/auth"
import { AccountChangeAddress } from "./changeAddress"
import { AccountChangeName } from "./changeName"
import { AccountChangePassword } from "./changePassword"
import { AccountChangePhone } from "./changePhone"

export const AccountRelatedPage = () => {
    const dispatch = useAppDispatch();
    const { name, phone, address} = useAppSelector(state => state.customer)

    const [isReady, setIsReady] = useState<boolean>(false);
    useEffect(() => {
        onAuthStateChanged(fbAuth, async user => {
           try {
                if(!user){
                    return Router.replace('/order?redirect=account')
                }

                let customer_result = await getCustomerInfo(await user?.getIdToken());
                dispatch(getCustomer(customer_result));
                setIsReady(true);
           } catch (error) {
                handleCatchError(error as Error, 'Failed to retrieve account info')
           }
          
        })
    }, [dispatch])

    return <>
        {
            isReady &&  <div>
            <Typography variant="h4">Account</Typography>

            <AccountChangeName name={name} account/>

            <AccountChangePhone phone={phone} account />

            <AccountChangeAddress address={address}/>

            <AccountChangePassword />
        </div>
        }
        
    </>
}