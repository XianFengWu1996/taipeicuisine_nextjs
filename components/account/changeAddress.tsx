import { Button, Typography } from "@mui/material"

export const AccountChangeAddress = () => {
    return <div style={{  marginTop: '20px'}}>
        <div>
            <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>ADDRESS </Typography>
            <Typography>69 HARVARD ST QUINCY MA 02171, USA</Typography>
            <Typography>Delivery Fee: $3</Typography>
        </div>

        <Button variant='outlined' sx={{ my: 1}}>Change Address</Button>
    </div>
}