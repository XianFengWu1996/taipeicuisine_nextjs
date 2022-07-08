import Router from "next/router"
import { AccountRelatedPage } from "../../components/account/account"
import { PublicAppBar } from "../../components/navigation/appbar/appbar"
import { OrderHistory } from "../../components/account/history"
import { RewardPage } from "../../components/account/reward"
import { SettingPage } from "../../components/account/setting"
import { WalletPage } from "../../components/account/wallet"
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

    const handleRedirectAndDisplayPage = () => {
        switch(Router.query.redirect){
            case 'order':
                return <OrderHistory />
            case 'reward':
                return <RewardPage />
            case 'wallet':
                return <WalletPage />
            case 'account':
                return <AccountRelatedPage />
            case 'setting':
                return <SettingPage />
            default:
                break;
        }
    }

    return <>
        <PublicAppBar />
        <div style={{ display: isMobile ? 'block' : 'flex'}}>
            {
                !isMobile ? <AccountNavigation /> : <AccountMobileNavigation />
            }
            <Contents>
                {handleRedirectAndDisplayPage()}
            </Contents>
        </div>
    </>
}



