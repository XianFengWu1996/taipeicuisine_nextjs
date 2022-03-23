import { Button, Card, CardActions, CardContent, Collapse, Dialog, DialogContent, Grid, Icon, IconButton, TextField, TextFieldProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { v4} from 'uuid'
import { BiTrash } from "react-icons/bi";
import { phoneFormat, removePhoneNum, selectDefaultPhone, updateName } from "../../../../utils/functions/phone";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { SmsDialog } from "../../../dialogs/smsDialog";
import { setSmsDialog } from "../../../../store/slice/customerSlice";


export const CustomerCollapse = () => {

    const { name, phone, phone_list, customerCollapse } = useAppSelector(state => state.customer);
    const [ customer_name, setName ] = useState('');
    const dispatch = useAppDispatch();

    const unique_phone_list = Array.from(new Set(phone_list));

    useEffect(() => {
        setName(name);
    }, [])

    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    }

    return <Collapse in={customerCollapse} timeout="auto" unmountOnExit>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {my: 1.5, width: '95%'},
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ display: 'flex'}}>
                <TextField
                    label="Name" 
                    variant="outlined" 
                    fullWidth
                    value={customer_name}
                    onChange={handleNameOnChange}
                    sx={{ flex: 8}}
                />

                <Button 
                    variant="outlined" 
                    onClick={() => updateName(customer_name)}
                    sx={{flex: 1, marginLeft: '5%'}}
                >Save</Button>
            </div>
    

        <Grid container spacing={2}>

            { 
                unique_phone_list.map((phone_num: string) => {
                    return <PhoneCard 
                        key={v4()} 
                        phone_num={phone_num}
                        isSelected={phone_num === phone}
                        handlePhoneRemove={removePhoneNum}
                        handlePhoneSelect={selectDefaultPhone}
                    />
                })
            }
            <Grid item  md={6} sm={12} xs={12}>
                <Card 
                    onClick={() => dispatch(setSmsDialog(true))}
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

        <SmsDialog />
    </Collapse>
}


interface IPhoneCardProps {
    phone_num: string,
    isSelected: boolean,
    handlePhoneSelect: (arg: string) => void,
    handlePhoneRemove: (arg: string) => void 
}

const PhoneCard = ({ phone_num, isSelected, handlePhoneRemove, handlePhoneSelect } : IPhoneCardProps) => {
    return <Grid item sm={6} xs={12}>
        <Card sx={{ padding: '1%'}}>
        <CardContent>{phoneFormat(phone_num)}</CardContent>
            <CardActions>
                <Button disabled={isSelected} onClick={() => handlePhoneSelect(phone_num)}>Select</Button>

                {
                    isSelected ? 
                        <Icon sx={{ lineHeight: 0, color: 'green'}}>
                            <AiOutlineCheckCircle />
                        </Icon> 
                    : null
                }

                {
                    !isSelected ? 
                        <IconButton  color="primary" onClick={() => handlePhoneRemove(phone_num)}>
                            <BiTrash/>
                        </IconButton> 
                    : null
                }
            </CardActions>
        </Card>
        </Grid>
}
