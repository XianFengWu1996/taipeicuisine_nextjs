import { Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { phoneFormat } from "../../utils/functions/phone"

interface IOrderContact {
    name: string, 
    phone: string,
    address: IAddress | null
}

export const TitleText = styled(Typography)(() => ({
    fontWeight: 'bolder', 
    fontSize: 20
}))

export const FieldText = styled(Typography)(() => ({
    fontSize: 15,
    fontWeight: 600
}))


export const OrderContact = ({ name, phone, address} : IOrderContact) => {
    return <div>
        <TitleText>Contact</TitleText>
        <FieldText>Name: {name}</FieldText>
        <FieldText>Phone: {phoneFormat(phone)}</FieldText>
        
        {
            address && <>
            <FieldText> Address: {address.address}</FieldText>
            { !isEmpty(address.business) && <FieldText> Business:{address.business}</FieldText> }
            { !isEmpty(address.apt) && <FieldText> Apt #:{address.apt}</FieldText> }
            </>
        }

    </div>
}