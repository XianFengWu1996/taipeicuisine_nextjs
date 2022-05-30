import { Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { phoneFormat } from "../../utils/functions/phone"
import { SectionTitle } from "../home/section_title"
import { AccountChangeAddress } from "./changeAddress"
import { AccountChangeName } from "./changeName"
import { AccountChangePhone } from "./changePhone"
import { TitleForSection } from "./components"

export const AccountRelatedPage = () => {
    return <>
        <div>x
            <Typography variant="h4">Account</Typography>

            <AccountChangeName name="Shawn  " />

            <AccountChangePhone phone="9175787352"/>

            <AccountChangeAddress />

            <div style={{  marginTop: '20px', width: '400px'}}>
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
         
    
        </div>
    </>
}