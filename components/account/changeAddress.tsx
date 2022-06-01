import { Button, Typography } from "@mui/material"
import { isEmpty } from "lodash"

interface IAccountChangeAddress {
    address: IAddress
}

export const AccountChangeAddress = ({ address } : IAccountChangeAddress) => {
    return <div style={{  marginTop: '20px'}}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 2}}>ADDRESS </Typography>

        {
            isEmpty(address.address) ?  <Typography>Please add your address...</Typography>: <div>
                <Typography>{address.address}</Typography>
                <Typography>Delivery Fee: ${address.delivery_fee}</Typography>
            </div>
        }

        <Button variant='outlined' sx={{ my: 1}}>{isEmpty(address.address) ? 'Add Address': 'Change Address'}</Button>
    </div>
}