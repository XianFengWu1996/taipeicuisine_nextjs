import { Button, Card, CardActions, CardContent, Icon, IconButton, Typography } from "@mui/material";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineChevronUp } from "react-icons/hi";
import { setAddressCollapse } from "../../../../store/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { DeliveryCollapse } from "./deliveryCollapse";

export const AddressCard = () => {
    const { addressCollapse } = useAppSelector(state => state.customer)

    const dispatch = useAppDispatch();

    const handleCollapseToogle = () => {
        dispatch(setAddressCollapse(!addressCollapse));
    }

    return <>
    
        <Typography variant="h4">Delivery Address</Typography>
        <Card>
            <CardContent style={{ display: 'flex'}}>
                <Icon style={{ fontSize: '35px', marginRight: '30px', marginLeft: '10px', alignSelf: 'center'}}>
                    <BiBuildingHouse />
                </Icon>

                <div style={{ flexGrow: 1}}>
                    <Typography>Address: 69 Harvard St, Quincy, MA 02171</Typography>
                    <Typography>Apt: 1022</Typography>
                    <Typography>Business: Taipei Cuisine</Typography>  
                </div>

            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingX: '30px'}}>
                {
                    addressCollapse 
                        ? <IconButton onClick={handleCollapseToogle} color="primary">
                            <HiOutlineChevronUp /> 
                        </IconButton> 
                        : <Button onClick={handleCollapseToogle}>Edit</Button>
                }
            </CardActions>

            <DeliveryCollapse />
        </Card>
    </>
}