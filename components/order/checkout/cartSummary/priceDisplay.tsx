import { Typography } from "@mui/material"
import { styled } from "@mui/system"

interface IPriceDisplayProps {
    title: string,
    value: number,
}

const Text = styled(Typography)(() => ({
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'capitalize',
}))

export const PriceDisplay = (props : IPriceDisplayProps) => {
    return   <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Text>{props.title}: </Text> 
        <Text>${props.value.toFixed(2)}</Text>
    </div>
}