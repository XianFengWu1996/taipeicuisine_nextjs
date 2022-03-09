import { Button, Card, CardActions, CardContent, Collapse, Grid, Icon, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { v4} from 'uuid'
import { BiTrash } from "react-icons/bi";
import { phoneFormat } from "../../../../utils/functions/phone";
import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { removePhoneNumber, setDefaultPhoneNumber, updateCustomerName } from "../../../../store/slice/customerSlice";

interface ICustomerCollapseProps {
    expand: boolean,
    handleCloseCard: () => void 
}

export const CustomerCollapse = (props: ICustomerCollapseProps) => {

    const { name, phone, phone_list } = useAppSelector(state => state.customer);
    const [ customer_name, setName ] = useState('');
    const [ customer_phone, setPhone ] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        setName(name);
        setPhone(phone);
    }, [])

    const renderPhoneList = () => {
        let list = Array.from(new Set(phone_list));
        return  list.map((phone_num: string) => {
            return <Grid 
                item lg={6} sm={12} 
                key={v4()} 
            ><Card sx={{ padding: 1}}>
                <CardContent>{phoneFormat(phone_num)}</CardContent>
                <CardActions>
                    <Button 
                        disabled={phone_num === phone}
                        onClick={() => {
                            // todo update the backend
                            dispatch(setDefaultPhoneNumber(phone_num));
                            props.handleCloseCard();
                        }}
                    >Select</Button>

                    {
                        phone_num === phone ? <Icon sx={{ lineHeight: 0, color: 'green'}}>
                            <AiOutlineCheckCircle />
                        </Icon> : null
                    }

                    <IconButton  color="primary" onClick={() => {
                        dispatch(removePhoneNumber(phone_num))
                    }}>
                        <BiTrash/>
                    </IconButton>

                    
                </CardActions>
            </Card></Grid>
        })
    }

    return <Collapse in={props.expand} timeout="auto" unmountOnExit>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {my: 1.5, width: '90%'},
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
        <div style={{ display: 'flex'}}>
            <TextField
                id="customer_name"
                label="Name" 
                variant="outlined" 
                fullWidth
                value={customer_name}
                onChange={(e) => { setName(e.target.value); }}
            />

            <Button 
                variant="outlined" 
                sx={{ paddingX: 5, marginLeft: '50px' }}
                onClick={() => {
                    // todo update the backend
                    if(customer_name !== name){
                        dispatch(updateCustomerName(customer_name));
                    }

                    props.handleCloseCard();

                }}
            >Save</Button>
        </div>
    

        <Grid container spacing={2}>
            { renderPhoneList() }
            <Grid item  lg={6} sm={12}>
                <Card 
                    sx={{ 
                        padding: 1, 
                        height: '100%', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Icon sx={{ fontSize: 45, color: '#555'}}>
                        <AiOutlinePlus />
                    </Icon>
                </Card>
            </Grid>
        </Grid>

        
        </Box>
    </Collapse>
}



  {/* <InputMask
        mask="(999) 999-9999"
        value={customer_phone}
        onChange={(e) => {
            let phone = e.target.value.replace(/[^A-Z0-9]/ig, "");
            setPhone(phone);
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
    </InputMask>             */}