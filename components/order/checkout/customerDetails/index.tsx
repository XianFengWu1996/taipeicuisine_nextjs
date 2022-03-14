import { Button, Skeleton, Typography, useMediaQuery } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"
import {  useAppSelector } from "../../../../store/store"
import { AddSpecialComment } from "./AddSpecialComment"
import { ApplyDiscount } from "./ApplyDiscount"
import { IncludeUtensils } from "./includeUtensils"
import { phoneFormat } from "../../../../utils/functions/phone"
import { CartSummary } from "../cartSummary"
import { User } from "firebase/auth"

interface ICustomerDetailsProp {
    user: User | null
}

export const CustomerDetails = ({ user } : ICustomerDetailsProp) => {
    const cartState = useAppSelector(state => state.cart)
    const { name, phone } = useAppSelector(state => state.customer)

    const desktop = useMediaQuery('(min-width: 900px)');

    return <div style={{ margin: '40px'}}>

        {
            user ? <PickupOrDelivery /> 
            : <Skeleton variant="rectangular" width={"50%"}>
                <PickupOrDelivery /> 
            </Skeleton>
        }

        {
            !desktop ? 
            // <CartSummary /> 
                user ? <CartSummary />  
                    : <Skeleton variant="rectangular" width={"100%"}>
                        <CartSummary /> 
                    </Skeleton>
            : null
        }

       {
           user ? <CustomerCard
                title="Customer Information"
                icon={<GrContactInfo />}
                content={<>
                    <Typography>Name: { name }</Typography>    
                    <Typography>Phone: {phoneFormat(phone)}</Typography>    
                </>}
            /> : <Skeleton variant="rectangular" height={250} sx={{ my: 5}} />
        }
        
        {
            cartState.is_delivery ? <CustomerCard 
                title="Delivery Address"
                icon={<BiBuildingHouse />}
                content={<>
                    <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                    <Typography>Apt: 1022</Typography>
                    <Typography>Business: Taipei Cuisine</Typography>   
                </>}
            /> : null
        }

        {
            user ? <>
                <ApplyDiscount />

                <AddSpecialComment />

                <IncludeUtensils />

                <PaymentSelection />

            </> : <Skeleton variant="rectangular" width={"100%"} height={300} sx={{ marginBottom: 3}}/>

        }

    
        <div>
        

            {
                user ?  <Button 
                    variant="contained" 
                    sx={{ backgroundColor: '#000', padding: '10px 50px'}}
                    disabled={cartState.payment_type !== 'cash' && cartState.payment_type !== 'instore'}
                >Place Order</Button> : <Skeleton variant="rectangular" width={'20%'} height={40}/>
            }
        </div>
    </div>
}

