import { Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { phoneFormat } from "../../utils/functions/phone"
import { SectionTitle } from "../home/section_title"
import { AccountChangeName } from "./ChangeName"
import { TitleForSection } from "./components"

export const AccountRelatedPage = () => {
    return <>
        <div>x
            <Typography variant="h4">Account</Typography>

            <AccountChangeName name="Shawn  " />

            <div style={{  marginTop: '20px'}}>
                <TitleForSection label={'phone'} />
                <TextField 
                    value={'9175787352'}
                    variant='outlined'
                    size='small'
                />

                <Button variant='outlined' sx={{ mx: 3, padding: 0.8}}>Change Phone</Button>
            </div>

            <div style={{  marginTop: '20px'}}>
                <div>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>ADDRESS </Typography>
                    <Typography>69 HARVARD ST QUINCY MA 02171, USA</Typography>
                    <Typography>Delivery Fee: $3</Typography>
                </div>

                <Button variant='outlined' sx={{ my: 1}}>Change Address</Button>
            </div>

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