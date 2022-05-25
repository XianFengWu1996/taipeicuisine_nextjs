import { Box, Typography } from "@mui/material"
import Link from "next/link"
import Router from "next/router"
import { AiOutlineUser, AiOutlineWallet } from "react-icons/ai"
import { BsCoin } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { IoReceiptOutline } from 'react-icons/io5'
import { AccountRelatedPage } from "../../components/account"
import { PublicAppBar } from "../../components/appbar/appbar"
import { OrderHistory } from "../../components/history"
import { RewardPage } from "../../components/reward"

export default function AccountPage() { 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', width: '400px'}}>
                    <Link href='/account?redirect=order' passHref>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px'}}>
                            <IoReceiptOutline size={25}/>
                            <Typography sx={{ fontSize: 25, ml:2}}>Order</Typography>
                        </Box>      
                    </Link>
                    <Link href='/account?redirect=reward' passHref>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px'}}>
                            <BsCoin size={25}/>
                            <Typography sx={{ fontSize: 25, ml:2}}>Reward</Typography>
                        </Box>  
                    </Link>
                    <Link href='/account?redirect=wallet' passHref>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px'}}>
                            <AiOutlineWallet size={25}/>
                            <Typography sx={{ fontSize: 25, ml:2}}>Wallet</Typography>
                        </Box></Link>
                    <Link href='/account?redirect=account' passHref>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px'}}>
                            <AiOutlineUser size={25}/>
                            <Typography sx={{ fontSize: 25, ml:2}}>Account</Typography>
                        </Box> 
                    </Link>
                    <Link href='/account?redirect=setting' passHref>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px'}}>
                            <FiSettings size={25}/>
                            <Typography sx={{ fontSize: 25, ml:2}}>Setting</Typography>
                        </Box> 
                    </Link>
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



