import { Divider, Typography } from "@mui/material"
import { BsCashCoin, BsCreditCard2Front } from "react-icons/bs"
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa, FaCreditCard } from "react-icons/fa"
import { RiStore2Line } from "react-icons/ri"
import { TitleText } from "./orderContact"

interface IOrderPayment {
    payment_type: IPaymentType, 
    card: StripeCard | null
}

export const OrderPayment = ({ payment_type, card } : IOrderPayment) => {
    const handleCreditCardBrand = (brand: string) => {
        switch(brand.toLowerCase()){
            case 'visa':
                return <FaCcVisa color={'#1A1F71'} size={35}/>
            case 'discover':
                return <FaCcDiscover color={'#e28743'} size={35}/>
            case 'mastercard':
                return <FaCcMastercard color={'#FF5F00'} size={35}/>
            case 'amex':
                return <FaCcAmex color={'#006BA6'} size={35}/>
            default: 
                return <FaCreditCard />
        }
    }
    return <>
        <TitleText>Payment</TitleText>
        <div style={{ display: 'flex'}}> 
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 23}}>
                {payment_type === 'online' && <BsCreditCard2Front />}
                {payment_type === 'cash' && <BsCashCoin />} 
                {payment_type === 'instore' && <RiStore2Line />} 

                {payment_type == 'cash' && <Typography sx={{ ml: 1, fontWeight: 600}}>Pay Cash Upon Delivery</Typography>} 
                {payment_type == 'instore' && <Typography sx={{ ml: 1, fontWeight: 600}}>Pay at Store</Typography>} 
                {payment_type == 'online' && <Typography sx={{ ml: 1, fontWeight: 600}}>Prepaid Online</Typography>} 

            </div>
            
            {
            card && <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                {handleCreditCardBrand(card.brand)}  
                <Typography sx={{ mx: 0.5, fontSize: 15, fontWeight: 600}}> xx-{card.last_4} </Typography>
                </div>
            }
        </div>

        <Divider sx={{ my: 2}} />
    </>
}