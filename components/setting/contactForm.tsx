import { Typography, TextField, Button } from "@mui/material"

export const ContactForm = () => {
    return <>
         <Typography variant="h4">Contact Us</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '60%'}}>

            <TextField 
                label="Email"
                sx={{ my: 1}}
                fullWidth
                size="small"
            />

            <TextField 
                label="Subject"
                sx={{ my: 1}}
                fullWidth
                size="small"

            />

            <TextField 
                label="Message"
                sx={{ my: 1}}
                fullWidth
                multiline
                minRows={7}
            />

            <Button variant="outlined">Submit</Button>
        </div>
    </>
}