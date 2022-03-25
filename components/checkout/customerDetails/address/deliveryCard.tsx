import { Button, Card, CardActions, CardContent, Icon, IconButton, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineChevronUp } from "react-icons/hi";
import { setAddressCollapse } from "../../../../store/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { DeliveryCollapse } from "./deliveryCollapse";

export const AddressCard = () => {
    const { addressCollapse, address } = useAppSelector(state => state.customer)

    const dispatch = useAppDispatch();

    const handleCollapseOpen = () => {
        if(!addressCollapse){
            dispatch(setAddressCollapse(true));
        }
    }

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

                {
                    !isEmpty(address.address) && !isEmpty(address.street)
                     ? <div style={{ flexGrow: 1}}>
                        <Typography>Address: {address.street},</Typography>
                        <Typography >{address.city}, {address.state}, {address.zipcode}</Typography>
                        {address.apt && <Typography>Apt: {address.apt}</Typography>}
                        {address.business &&  <Typography>Business: {address.business}</Typography>}  
                    </div> : 
                    <Button onClick={handleCollapseOpen}>Search For Address</Button>
                }

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