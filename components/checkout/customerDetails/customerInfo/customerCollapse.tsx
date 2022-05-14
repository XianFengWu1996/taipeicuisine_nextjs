import { Button, Card, Collapse, Grid, Icon, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { v4} from 'uuid'
import { removePhoneNum, selectDefaultPhone, updateName } from "../../../../utils/functions/phone";
import { ChangeEvent, useEffect, useState } from "react";
import {  AiOutlinePlus } from "react-icons/ai";
import { SmsDialog } from "../../../dialogs/smsDialog";
import { setSmsDialog } from "../../../../store/slice/settingSlice";
import { PulseLoader, ScaleLoader } from "react-spinners";
import { red } from "@mui/material/colors";
import { PhoneCard } from "./phoneCard";


export const CustomerCollapse = () => {

    const { name, phone, phone_list, } = useAppSelector(state => state.customer);
    const { customerCollapse, customerSaveLoading, customerCardLoading} = useAppSelector(state => state.setting)
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
                >{
                    customerSaveLoading ? 
                         <PulseLoader size={5} color="red"/>
                    : 'Save'
                }</Button>
            </div>
    
        {
            customerCardLoading 
            ? <div style={{ display: 'flex', justifyContent: 'center'}}>
                <ScaleLoader height={25} color={red[400]} />
              </div> 
            : null
        }

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


