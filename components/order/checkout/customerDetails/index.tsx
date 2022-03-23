import { Button, Skeleton, useMediaQuery } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"
import {  useAppSelector } from "../../../../store/store"
import { AddSpecialComment } from "./AddSpecialComment"
import { ApplyDiscount } from "./ApplyDiscount"
import { IncludeUtensils } from "./includeUtensils"
import { CartSummary } from "../cartSummary"
import { User } from "firebase/auth"
import { styled } from "@mui/system"

interface ICustomerDetailsProp {
    user: User | null
}

const CheckoutContainer = styled('div')(({ theme }) => ({
    margin: '40px',

    [theme.breakpoints.down('md')]: {
        margin: '25px',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '15px',
    },
}))

export const CustomerDetails = ({ user } : ICustomerDetailsProp) => {
    const cartState = useAppSelector(state => state.cart)

    const desktop = useMediaQuery('(min-width: 900px)');

    return <CheckoutContainer>

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
           user ? <CustomerCard /> : <Skeleton variant="rectangular" height={250} sx={{ my: 5}} />
        }
        
        {/* {
            cartState.is_delivery ? <CustomerCard 
                title="Delivery Address"
                icon={<BiBuildingHouse />}
                content={<>
                    <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                    <Typography>Apt: 1022</Typography>
                    <Typography>Business: Taipei Cuisine</Typography>   
                </>}
            /> : null
        } */}

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
    </CheckoutContainer>
}

