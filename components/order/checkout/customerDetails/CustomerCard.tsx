import { Button, Card, CardActions, CardContent, Icon, Typography } from "@mui/material"
import { ReactElement } from "react"


interface ICustomerCardProps {
    title: string,
    icon: ReactElement<any>, 
    content: ReactElement<any>
}

export const CustomerCard = ({ title, icon, content }: ICustomerCardProps) => {
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

            <CardActions>
                <Button>Edit</Button>
            </CardActions>
        </Card>
    </>
}