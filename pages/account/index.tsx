import { Typography } from "@mui/material"
import Link from "next/link"
import Router from "next/router"
import { AccountRelatedPage } from "../../components/account"
import { PublicAppBar } from "../../components/appbar/appbar"
import { OrderHistory } from "../../components/history"
import { RewardPage } from "../../components/reward"

export default function AccountPage() { 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', width: '400px'}}>
                    <Link href='/account?redirect=order' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Order</Typography></Link>
                    <Link href='/account?redirect=reward' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Reward</Typography></Link>
                    <Link href='/account?redirect=account' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Account</Typography></Link>
                    <Link href='/account?redirect=setting' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Setting</Typography></Link>
                </div>

        <div style={{ flex: 1}}>
            {
                Router.query.redirect === 'order' && <OrderHistory />
            }

            {
                Router.query.redirect === 'reward' && <RewardPage />
            }

            {
                Router.query.redirect === 'account' && <AccountRelatedPage />
            }
        </div>
        </div>
      
    </>
}



