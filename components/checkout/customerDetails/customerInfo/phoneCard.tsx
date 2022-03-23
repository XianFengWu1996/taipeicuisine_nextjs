import { Button, Card, CardActions, CardContent, Grid, Icon, IconButton } from "@mui/material"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"
import { phoneFormat } from "../../../../utils/functions/phone"


interface IPhoneCardProps {
    phone_num: string,
    isSelected: boolean,
    handlePhoneSelect: (arg: string) => void,
    handlePhoneRemove: (arg: string) => void 
}

export const PhoneCard = ({ phone_num, isSelected, handlePhoneRemove, handlePhoneSelect } : IPhoneCardProps) => {
    return <Grid item sm={6} xs={12}>
        <Card sx={{ padding: '1%'}}>
        <CardContent>{phoneFormat(phone_num)}</CardContent>
            <CardActions>
                <Button disabled={isSelected} onClick={() => handlePhoneSelect(phone_num)}>Select</Button>

                {
                    isSelected ? 
                        <Icon sx={{ lineHeight: 0, color: 'green'}}>
                            <AiOutlineCheckCircle />
                        </Icon> 
                    : null
                }

                {
                    !isSelected ? 
                        <IconButton  color="primary" onClick={() => handlePhoneRemove(phone_num)}>
                            <BiTrash />
                        </IconButton> 
                    : null
                }
            </CardActions>
        </Card>
        </Grid>
}
