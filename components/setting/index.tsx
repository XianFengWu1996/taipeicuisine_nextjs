import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"

export const SettingPage = () => {
    return <div style={{ paddingBottom: '50px'}}>
        <Typography variant="h4">Setting</Typography>

        <Box sx={{ width: '30%'}}>
            <Typography>Choose your mode</Typography>
            <FormControl fullWidth>
                <InputLabel id="language_select_label">Mode</InputLabel>
                <Select
                    labelId="language_select_label"
                    id="language_select"
                    label="language"
                >
                    <MenuItem value={'english'}>Light Mode</MenuItem>
                    <MenuItem value={'chinese'}>Dark Mode</MenuItem>
                </Select>
            </FormControl>
        </Box>
        
        <Box sx={{ width: '30%'}}>
            <Typography>Choose your prefer language</Typography>
            <FormControl fullWidth>
                <InputLabel id="language_select_label">Language</InputLabel>
                <Select
                    labelId="language_select_label"
                    id="language_select"
                    label="language"
                >
                    <MenuItem value={'english'}> 🇺🇸 English</MenuItem>
                    <MenuItem value={'chinese'}> 🇨🇳 简体中文</MenuItem>
                </Select>
            </FormControl>
        </Box>

        

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <Link href="/">
                <a style={{ textDecoration: 'underline', color: 'blue'}}>Privacy Policy</a>
            </Link>         
            <Link href="/">
                <a style={{ textDecoration: 'underline', color: 'blue'}}>Terms and Conditions</a>
            </Link>
            <Link href="/">
                <a style={{ textDecoration: 'underline', color: 'blue'}}>Refund Policy</a>
            </Link>     
        </Box>       

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
    </div>
}