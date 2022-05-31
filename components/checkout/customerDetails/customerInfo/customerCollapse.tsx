import { Button, Card, Collapse, Grid, Icon, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { v4} from 'uuid'
import { removePhoneNum, selectDefaultPhone } from "../../../../utils/functions/phone";
import { ChangeEvent, useEffect, useState } from "react";
import {  AiOutlinePlus } from "react-icons/ai";
import { SmsDialog } from "../../../dialogs/smsDialog";
import { setShowSmsDialog } from "../../../../store/slice/settingSlice";
import { PulseLoader, ScaleLoader } from "react-spinners";
import { red } from "@mui/material/colors";
import { PhoneCard } from "./phoneCard";
import { updateNameInCard } from "../../../../utils/functions/account";


export const CustomerCardCollaspe = () => {

    const { name, phone, phone_list, } = useAppSelector(state => state.customer);
    const { show_customer_card, save_name_loading, customer_card_loading} = useAppSelector(state => state.setting)
    const [ customer_name, setName ] = useState(name);
    const dispatch = useAppDispatch();

    const unique_phone_list = Array.from(new Set(phone_list));

    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value)
        setName(e.target.value);
    }

    return <Collapse in={show_customer_card} timeout="auto" unmountOnExit>
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
                    onClick={() => updateNameInCard(customer_name, name)}
                    sx={{flex: 1, marginLeft: '5%'}}
                >{
                    save_name_loading ? 
                         <PulseLoader size={5} color="red"/>
                    : 'Save'
                }</Button>
            </div>
    
        {
            customer_card_loading 
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
                    onClick={() => dispatch(setShowSmsDialog(true))}
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


