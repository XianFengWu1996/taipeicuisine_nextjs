import { Button, ButtonGroup } from "@mui/material"
import { useState } from "react";

export const PickupOrDelivery = () => {
    const [isDelivery, setIsDelivery] = useState(false);

    const toggleDelivery = () => {
        setIsDelivery(!isDelivery);
    }

    return <ButtonGroup size="large">
        <Button 
            variant={isDelivery ? 'outlined' : 'contained'}
            onClick={toggleDelivery}
        >Pick Up</Button>
        <Button 
            variant={isDelivery ? 'contained' : 'outlined'}
            onClick={toggleDelivery}
        >Delivery</Button>
    </ButtonGroup>

}