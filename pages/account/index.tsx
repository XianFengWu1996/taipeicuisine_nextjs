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

export default function AccountPage() { 
    return <>
        <PublicAppBar />
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', width: '400px'}}>
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
                    />
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

            {
                Router.query.redirect === 'wallet' && <WalletPage />
            }

            {
                Router.query.redirect === 'setting' && <SettingPage />
            }
        </div>
        </div>
      
    </>
}



