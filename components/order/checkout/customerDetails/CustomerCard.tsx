import { Button, Card, CardActions, CardContent,Icon, IconButton, Typography } from "@mui/material"
import { ReactElement, useState } from "react"
import {HiOutlineChevronUp} from 'react-icons/hi'
import { CustomerCollapse } from "./customerCollapse";


interface ICustomerCardProps {
    title: string,
    icon: ReactElement<any>, 
    content: ReactElement<any>
}

export const CustomerCard = ({ title, icon,  content }: ICustomerCardProps) => {
    const [ expand, setExpand ] = useState(false);

    const handleToggleExpand = () => {
        setExpand(!expand);
    }

    return <>
        <Typography variant="h4">{title}</Typography>
        <Card sx={{ width: '90%'}}>
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
                    expand 
                        ? <IconButton onClick={handleToggleExpand} color="primary">
                            <HiOutlineChevronUp /> 
                        </IconButton> 
                        : <Button onClick={handleToggleExpand}>Edit</Button>
                }
            </CardActions>

            <CustomerCollapse expand={expand} handleCloseCard={handleToggleExpand}/>
        </Card>
        
      
    </>
}