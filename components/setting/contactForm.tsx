import { Typography, TextField, Button } from "@mui/material"

export const ContactForm = () => {
    return <>
         <Typography variant="h4">Contact Us</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', width: '60%'}}>

            <TextField 
                type={'email'}
                label="Email"
                sx={{ my: 1}}
                fullWidth
                size="small"
                required
            />

            <TextField 
                type={'text'}
                label="Subject"
                sx={{ my: 1}}
                fullWidth
                size="small"
                required

            />

            <TextField 
                label="Message"
                type={'text'}
                sx={{ my: 1}}
                fullWidth
                multiline
                minRows={7}
                required
            />

            <Button variant="outlined">Submit</Button>
        </form>
    </>
}