import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react"

interface IAccountChangeName {
    name: string
}

export const AccountChangeName = (_: IAccountChangeName) => {
    const [name, setName] = useState('');
    return <div style={{  marginTop: '20px'}}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>NAME </Typography>
        <TextField
            value={name}
            variant='outlined'
            size='small'
            onChange={(e) => setName(e.target.value)}
        />
        <Button variant='outlined' sx={{ mx: 3, padding: 0.8}}>Change Name</Button>

    </div>
}