
import { Typography } from "@mui/material"
import Link from "next/link"
import Router from "next/router"
import { useEffect } from "react"
import { v4 } from "uuid"
import { PublicAppBar } from "../../components/appbar/appbar"
import { OrderHistory } from "../../components/history"

export default function AccountPage() { 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', flex: 1}}>
                    <Link href='/account?redirect=order' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Order</Typography></Link>
                    <Link href='/account?redirect=reward' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Reward</Typography></Link>
                    <Link href='/account?redirect=account' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Account</Typography></Link>
                    <Link href='/account?redirect=setting' passHref><Typography sx={{ fontSize: 25, mb: 2}}>Setting</Typography></Link>
                </div>

        {
            Router.query.redirect === 'order' && <OrderHistory />
         }
        </div>
      
    </>
}



