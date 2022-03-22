import { Button, Card, CardActions, CardContent, Collapse, Dialog, DialogContent, Grid, Icon, IconButton, TextField, TextFieldProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { v4} from 'uuid'
import { BiTrash } from "react-icons/bi";
import { phoneFormat, selectDefaultPhone } from "../../../../utils/functions/phone";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { removePhoneNumber, setDefaultPhoneNumber, updateCustomerName } from "../../../../store/slice/customerSlice";
import snackbar from "../../../snackbar";
import { SmsDialog } from "../../../dialogs/smsDialog";


interface ICustomerCollapseProps {
    expand: boolean,
    handleCloseCard: () => void 
}

export const CustomerCollapse = (props: ICustomerCollapseProps) => {

    const { name, phone, phone_list } = useAppSelector(state => state.customer);
    const [ customer_name, setName ] = useState('');

    const [smsOpen, setSmsOpen] = useState(false);
  
    const dispatch = useAppDispatch();

    useEffect(() => {
        setName(name);
    }, [])

    const handlePhoneSelect = (phone_num: string) => {
        selectDefaultPhone(phone_num, props.handleCloseCard);
    }

    const handlePhoneRemove = (phone_num: string) => {
        dispatch(removePhoneNumber(phone_num))
        snackbar.warning('Phone removed')
    }

    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    }

    const handleNameOnSave = () => {
        // todo update the backend
        if(customer_name !== name){
            dispatch(updateCustomerName(customer_name));
            snackbar.success('Name updated');
        }

        props.handleCloseCard();
    }

    const handleSmsComplete = () => {
        setSmsOpen(false);
        props.handleCloseCard();
        snackbar.success('New phone number has been added');
    }

    const renderPhoneList = () => {
        let list = Array.from(new Set(phone_list));
        return  list.map((phone_num: string) => {
            return <PhoneCard 
                key={v4()} 
                phone_num={phone_num}
                isSelected={phone_num === phone}
                handlePhoneRemove={handlePhoneRemove}
                handlePhoneSelect={handlePhoneSelect}
            />
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
                    onClick={handleNameOnSave}
                    sx={{flex: 1, marginLeft: '5%'}}
                >Save</Button>
            </div>
    

        <Grid container spacing={2}>
            { renderPhoneList() }
            <Grid item  md={6} sm={12} xs={12}>
                <Card 
                    onClick={() => setSmsOpen(true)}
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

        <SmsDialog 
            open={smsOpen} 
            handleSmsComplete={handleSmsComplete}
            handleClose={() => setSmsOpen(false)}/>
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
