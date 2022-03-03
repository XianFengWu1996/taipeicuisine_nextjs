import { Button, ButtonGroup, Typography } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'
import { TipSelection } from "./tipSelection"
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"


export const CustomerDetails = () => {
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

        <CustomerCard 
            title="Delivery Address"
            icon={<BiBuildingHouse />}
            content={<>
                <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                <Typography>Apt: 1022</Typography>
                <Typography>Business: Taipei Cuisine</Typography>   
            </>}
        />

        <TipSelection />

        <PaymentSelection />

        <div>
            <Button variant="contained">Continue</Button>
        </div>
    </div>
}