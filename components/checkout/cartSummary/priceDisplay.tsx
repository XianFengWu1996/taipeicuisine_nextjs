import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',   
    }
}))

export const PriceDisplay = (props : IPriceDisplayProps) => {
    return   <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Text>{props.title}: </Text> 
        <Text>${props.value.toFixed(2)}</Text>
    </div>
}