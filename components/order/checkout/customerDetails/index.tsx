import { Button, ButtonGroup, Card, CardActions, CardContent, Typography } from "@mui/material"
import { CustomerCard } from "./CustomerCard"
import { PickupOrDelivery } from "./pickupOrDelivery"
import { BiBuildingHouse } from 'react-icons/bi'
import { GrContactInfo } from 'react-icons/gr'


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

                    <Typography variant="h4">Tip</Typography>
                    <ButtonGroup size="large">
                        <Button>10%</Button>
                        <Button>15%</Button>
                        <Button>20%</Button>
                        <Button>Custom</Button>
                    </ButtonGroup>

                    <Typography variant="h4">Payment</Typography>
                    <ButtonGroup>
                        <Button>Pay Online</Button>
                        <Button>In Store</Button>
                    </ButtonGroup>

                    <div>
                    <Button variant="contained">Continue</Button>

                    </div>
    </div>
}