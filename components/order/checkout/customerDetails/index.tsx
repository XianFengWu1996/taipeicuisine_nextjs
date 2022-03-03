import { Button, ButtonGroup, Typography } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'
import { TipSelection } from "./tipSelection"
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"
import { useAppSelector } from "../../../../store/store"


export const CustomerDetails = () => {
    const cartState = useAppSelector(state => state.cart)
    return <div style={{ margin: '40px'}}>
        <PickupOrDelivery />

        <CustomerCard
            title="Customer Information"
            icon={<GrContactInfo />}
            content={<>
                <Typography>Name: Xian Feng Wu</Typography>    
                <Typography>Phone: 917-578-7352</Typography>    
            </>}
        />

        {
            cartState.isDelivery ? <CustomerCard 
                title="Delivery Address"
                icon={<BiBuildingHouse />}
                content={<>
                    <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                    <Typography>Apt: 1022</Typography>
                    <Typography>Business: Taipei Cuisine</Typography>   
                </>}
            /> : null
        }

        <TipSelection />

        <PaymentSelection />

        <div>
            <Button variant="contained">Continue</Button>
        </div>
    </div>
}