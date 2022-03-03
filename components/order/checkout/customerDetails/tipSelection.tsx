import { Button, ButtonGroup, Typography } from "@mui/material"

export const TipSelection = () => {
    return <>
        <Typography variant="h4">Tip</Typography>
        <ButtonGroup size="large">
            <Button>10%</Button>
            <Button>15%</Button>
            <Button>20%</Button>
            <Button>Custom</Button>
        </ButtonGroup>
    </>
}