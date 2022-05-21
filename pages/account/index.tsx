
import Link from "next/link"
import Router from "next/router"
import { useEffect } from "react"
import { v4 } from "uuid"
import { PublicAppBar } from "../../components/appbar/appbar"
import { OrderHistory } from "../../components/history"

export default function AccountPage() {
 
    useEffect(() => {
        console.log(Router.query.order)
        console.log(Router.query.account)
    }, [Router.query])
 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'lightblue'}}>
            <Link href={`/account?order=${v4()}`}>Order</Link>
            <Link href={`/account?reward=${v4()}`}>Reward</Link>
            <Link href={`/account?account=${v4()}`}>Account</Link>
            <Link href={`/account?setting=${v4()}`}>Setting</Link>

        </div>

        {
            Router.query.order && <OrderHistory />
         }
        </div>
      
    </>
}



