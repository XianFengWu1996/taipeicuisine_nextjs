import { Button, Card, CardActions, CardContent,Icon, IconButton, Typography } from "@mui/material"
import { ReactElement, useState } from "react"
import {HiOutlineChevronUp} from 'react-icons/hi'
import { setCustomerCollapse } from "../../../../store/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { CustomerCollapse } from "./customerCollapse";


interface ICustomerCardProps {
    title: string,
    icon: ReactElement<any>, 
    content: ReactElement<any>
}

export const CustomerCard = ({ title, icon,  content }: ICustomerCardProps) => {
    const { customerCollapse } = useAppSelector(state => state.customer)
    const dispatch = useAppDispatch();

    const handleCollapseToogle = () => {
        dispatch(setCustomerCollapse(!customerCollapse));
    }

    return <>
        <Typography variant="h4">{title}</Typography>
        <Card>
            <CardContent style={{ display: 'flex'}}>
                <Icon style={{ fontSize: '35px', marginRight: '30px', marginLeft: '10px', alignSelf: 'center'}}>
                    { icon }
                </Icon>

                <div style={{ flexGrow: 1}}>
                    { content }
                </div>

            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingX: '30px'}}>
                {
                    customerCollapse 
                        ? <IconButton onClick={handleCollapseToogle} color="primary">
                            <HiOutlineChevronUp /> 
                        </IconButton> 
                        : <Button onClick={handleCollapseToogle}>Edit</Button>
                }
            </CardActions>

            <CustomerCollapse />
        </Card>
        
      
    </>
}