import Router from "next/router"
import { AiOutlineUser, AiOutlineWallet } from "react-icons/ai"
import { BsCoin } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { IoReceiptOutline } from 'react-icons/io5'
import { AccountRelatedPage } from "../../components/account"
import { AccountLink } from "../../components/account/components"
import { PublicAppBar } from "../../components/navigation/appbar/appbar"
import { OrderHistory } from "../../components/history"
import { RewardPage } from "../../components/reward"
import { SettingPage } from "../../components/setting"
import { WalletPage } from "../../components/wallet"
import { useMediaQuery } from "@mui/material"
import { styled } from "@mui/system"
import { AccountMobileNavigation, AccountNavigation } from "./account_nav"

const Contents = styled('div')(({ theme }) => ({
    width: '60vw',

    [theme.breakpoints.down('md')]: {
        width: '90%',
        margin: '0 auto'
    }
})) 

export default function AccountPage() { 

    const isMobile = useMediaQuery('(max-width: 900px)'); // check if it' mobile 

    return <>
        <PublicAppBar />
        <div style={{ display: isMobile ? 'block' : 'flex'}}>
            {
                !isMobile ? <AccountNavigation /> : <AccountMobileNavigation />
            }
        <Contents>
            {
                Router.query.redirect === 'order' && <OrderHistory />
            }

            {
                Router.query.redirect === 'reward' && <RewardPage />
            }

            {
                Router.query.redirect === 'account' && <AccountRelatedPage />
            }

            {
                Router.query.redirect === 'wallet' && <WalletPage />
            }

            {
                Router.query.redirect === 'setting' && <SettingPage />
            }
        </Contents>
        </div>
      
    </>
}



