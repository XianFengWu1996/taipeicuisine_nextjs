import { Button, Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'
import { GiThreeLeaves } from 'react-icons/gi'
import { CustomerCard } from "./customerCard"
import { PaymentSelection } from "./paymentSelection"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { blue } from "@mui/material/colors"
import { AddSpecialComment } from "./AddSpecialComment"
import { ApplyDiscount } from "./ApplyDiscount"
import { IncludeUtensils } from "./includeUtensils"


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

        {/* <TipSelection /> */}

        <PaymentSelection />

        <ApplyDiscount />

        <AddSpecialComment />

        <IncludeUtensils />

        <div>
            <Button variant="contained" sx={{ backgroundColor: '#000', padding: '10px 50px'}}>Place Order</Button>
        </div>
    </div>
}

