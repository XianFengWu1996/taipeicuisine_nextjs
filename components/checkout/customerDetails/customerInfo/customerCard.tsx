import { Button, Card, CardActions, CardContent,Icon, IconButton, Typography } from "@mui/material"
import { GrContactInfo } from "react-icons/gr";
import {HiOutlineChevronUp} from 'react-icons/hi'
import { setShowCustomerCard } from "../../../../store/slice/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { phoneFormat } from "../../../../utils/functions/phone";
import { CustomerCardCollaspe } from "./customerCollapse";

export const CustomerCard = () => {
    const { name, phone } = useAppSelector(state => state.customer)
    const { show_customer_card } = useAppSelector(state => state.setting)

    const dispatch = useAppDispatch();

    const handleCollapseToogle = () => {
        dispatch(setShowCustomerCard(!show_customer_card));
    }

    return <>
        <Typography variant="h4">Customer Information</Typography>
        <Card>
            <CardContent style={{ display: 'flex'}}>
                <Icon style={{ fontSize: '35px', marginRight: '30px', marginLeft: '10px', alignSelf: 'center'}}>
                    <GrContactInfo />
                </Icon>

                <div style={{ flexGrow: 1}}>
                    <Typography>Name: { name }</Typography>    
                    <Typography>Phone: {phoneFormat(phone)}</Typography>   
                </div>

            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingX: '30px'}}>
                {
                    show_customer_card 
                        ? <IconButton onClick={handleCollapseToogle} color="primary">
                            <HiOutlineChevronUp /> 
                        </IconButton> 
                        : <Button onClick={handleCollapseToogle}>Edit</Button>
                }
            </CardActions>

            <CustomerCardCollaspe />
        </Card>
    </>
}