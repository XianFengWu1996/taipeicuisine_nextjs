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

        {/* <TipSelection /> */}

        <PaymentSelection />

        <ApplyDiscount />

        <AddSpecialComment />

        <Card sx={{ margin: '10px 0 25px 0', width: '300px', height: '100px'}}>
            <CardContent>
                <Typography sx={{ color: 'green', fontWeight: 700}}>
                      <GiThreeLeaves />  Eco-Friendly
                    </Typography>

                <FormControlLabel control={<Checkbox />} label="Don&apos;t Include Utensils" />
            </CardContent>
        </Card>

        <div>
            <Button variant="contained" sx={{ backgroundColor: '#000', padding: '10px 50px'}}>Place Order</Button>
        </div>
    </div>
}


const ApplyDiscount = () => {
    return <>
        <Button sx={{ color: blue[500]}}>Apply Discount</Button>
    </>
}
