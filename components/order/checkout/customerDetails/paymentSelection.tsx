import { Button, ButtonGroup, Typography } from "@mui/material"

export const PaymentSelection = () => {
    return <>
        <Typography variant="h4">Payment</Typography>
        <ButtonGroup>
            <Button>Pay Online</Button>
            <Button>In Store</Button>
        </ButtonGroup>
    </>
}