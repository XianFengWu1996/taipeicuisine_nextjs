import { Button, TextField, Typography } from "@mui/material"

export const AccountChangePassword = () => {
    return <div style={{  marginTop: '20px', width: '400px'}}>
    <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>Change Password</Typography>
    <div>
        <TextField
            value={'Old Password'}
            variant='outlined'
            size='small'
            fullWidth
            sx={{ display: 'block', my: 1}}
        />
        <TextField 
            value={'New Password'}
            variant='outlined'
            size='small'
            fullWidth
            sx={{ display: 'block', my: 1}}
        />
        <TextField 
            value={'Confirm New Password'}
            variant='outlined'
            size='small'
            fullWidth
            sx={{ display: 'block', my: 1}}
        />
    </div>
    <Button variant='outlined' sx={{ my: 1}}>Change Password</Button>

</div>
}