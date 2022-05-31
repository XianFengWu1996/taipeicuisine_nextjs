import { Button, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react"
import { handleCatchError } from "../../utils/errors/custom";
import { fbAuth } from "../../utils/functions/auth";

interface IAccountChangeName {
    name: string
}

export const AccountChangeName = (_: IAccountChangeName) => {
    const [name, setName] = useState(_.name);
    return <div style={{  marginTop: '20px'}}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>NAME </Typography>
        <TextField
            value={name}
            variant='outlined'
            size='small'
            onChange={(e) => setName(e.target.value)}
        />
        <Button variant='outlined' sx={{ mx: 3, padding: 0.8}} onChange={ async () => {
            try {
                await axios.patch(`${process.env.NEXT_PUBLIC_CF_URL}/customer/name`, { name }, {
                    headers: {
                        'authorization': `${await fbAuth.currentUser?.getIdToken()}`
                    }
                })

                
            } catch (error) {
                handleCatchError(error as Error, 'Failed to update name');
            }
        }}>Change Name</Button>

    </div>
}