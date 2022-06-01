import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { TitleForSection } from "./components";


interface IAccountChangePhone {
    phone: string,
    account: boolean
}

export const AccountChangePhone = (_:IAccountChangePhone) => {
    const [phone, setPhone] = useState(_.phone);
   return <div style={{  marginTop: '20px'}}>
        <TitleForSection label={'phone'} />
        <TextField
            value={phone}
            variant='outlined'
            size='small'
            onChange={(e) => {
                setPhone(e.target.value);
            }}
        />

        <Button variant='outlined' sx={{ mx: 3, padding: 0.8}}>Change Phone</Button>
    </div>
}