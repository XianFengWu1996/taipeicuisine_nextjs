import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { isString } from "lodash"
import Router from "next/router"
import { useEffect, useState } from "react"
import { AiOutlineUser, AiOutlineWallet } from "react-icons/ai"
import { BsCoin } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { IoReceiptOutline } from "react-icons/io5"
import { IconType } from "react-icons/lib"
import { AccountLink } from "../../components/account/components"

export const AccountNavigation = () => {
    return <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', width: '30%'}}>
            <AccountLink
                href="/account?redirect=order"
                label="Order"
                LinkIcon={IoReceiptOutline}
            />

            <AccountLink 
                href="/account?redirect=reward"
                label="Reward"
                LinkIcon={BsCoin}
            />

            <AccountLink 
                href="/account?redirect=wallet"
                label="Wallet"
                LinkIcon={AiOutlineWallet}
            />
            
            <AccountLink 
                href="/account?redirect=account"
                label="Account"
                LinkIcon={AiOutlineUser}
            />
    
            <AccountLink 
                href="/account?redirect=setting"
                label="Setting"
                LinkIcon={FiSettings}
            /></div>
    </>
}

export const AccountMobileNavigation = () => {
    const redirect_query = Router.query.redirect;

    const [navigation, setNavigation] = useState<string>('');

    useEffect(() => {
        if(isString(redirect_query)){
            setNavigation(redirect_query as unknown as string)
        }
    }, [redirect_query])

    return <FormControl sx={{ mx: 3, mt: 4, width: '75%'}}>
        <InputLabel id="account-nav-select-label">Navigation</InputLabel>
        <Select
            labelId="account-nav-select-label"
            id="account-nav-select"
            value={navigation}
            label="Navigation"
            onChange={(e) => {
                setNavigation(e.target.value)
                Router.push(`/account?redirect=${e.target.value}`)
            }}
        >
            <MenuItem value={'order'}> 
                <SelectMenuItemWithIcon 
                    val={"order"}
                    Icon={IoReceiptOutline}
                />
            </MenuItem>

            <MenuItem value={'reward'}> 
                <SelectMenuItemWithIcon 
                    val={"reward"}
                    Icon={BsCoin}
                />
            </MenuItem>

            <MenuItem value={'wallet'}> 
                <SelectMenuItemWithIcon 
                    val={"wallet"}
                    Icon={AiOutlineWallet}
                />
            </MenuItem>

            <MenuItem value={'account'}> 
                <SelectMenuItemWithIcon 
                    val={"account"}
                    Icon={AiOutlineUser}
                />
            </MenuItem>

            <MenuItem value={'setting'}> 
                <SelectMenuItemWithIcon 
                    val={"setting"}
                    Icon={FiSettings}
                />
            </MenuItem>
        </Select>
        </FormControl>
}

interface ISelectMenuItemWithIcon {
    val: string,
    Icon: IconType,
}

export const SelectMenuItemWithIcon = ({val, Icon}:ISelectMenuItemWithIcon) => {
    return <div style={{ display: 'flex', alignItems: 'center'}}>
        <Icon />
        <Typography sx={{ ml: 2, textTransform: 'capitalize'}}>{val}</Typography>
    </div>
}