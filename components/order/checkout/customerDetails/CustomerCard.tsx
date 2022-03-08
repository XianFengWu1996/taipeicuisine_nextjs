import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, Icon, TextField, TextFieldProps, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChangeEvent, ChangeEventHandler, ReactElement, useEffect, useState } from "react"
import { useAppSelector } from "../../../../store/store";
import InputMask from 'react-input-mask';


interface ICustomerCardProps {
    title: string,
    icon: ReactElement<any>, 
    content: ReactElement<any>
}

export const CustomerCard = ({ title, icon, content }: ICustomerCardProps) => {
    const [ customer_name, setName ] = useState('');
    const [ customer_phone, setPhone ] = useState('');

    const { name, phone } = useAppSelector(state => state.customer);

    useEffect(() => {
        setName(name);
        setPhone(phone);
    }, [])
    

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
        
        <Box
            component="form"
            sx={{
                '& > :not(style)': {my: 2, width: '90%', display: 'block',  },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField 
                id="customer_name"
                label="Name" 
                variant="outlined" 
                fullWidth
                value={customer_name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />

              
        <InputMask
            mask="(999) 999-9999"
            value={customer_phone}
            onChange={(e) => {
                setPhone(e.target.value);
            }}           
            >
            {(inputProps: TextFieldProps)=>
              <TextField 
                id="customer_phone" 
                label="Phone"
                variant="outlined"
                fullWidth 
                type={'tel'}
                {...inputProps}
             />
            }
            </InputMask>            
           

            <Button sx={{ backgroundColor: '#000'}} variant="contained">Edit</Button>
        </Box>
    </>
}