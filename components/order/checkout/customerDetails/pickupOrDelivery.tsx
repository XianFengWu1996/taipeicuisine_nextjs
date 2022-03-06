import { Button, ButtonGroup } from "@mui/material"
import { useState } from "react";
import { deliveryToggle } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

export const PickupOrDelivery = () => {
    const cartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const toggleDelivery = () => {
        dispatch(deliveryToggle())
    }

    return <ButtonGroup size="large">
        <Button 
            variant={cartState.is_delivery ? 'outlined' : 'contained'}
            onClick={toggleDelivery}
        >Pick Up</Button>
        <Button 
            variant={cartState.is_delivery  ? 'contained' : 'outlined'}
            onClick={toggleDelivery}
        >Delivery</Button>
    </ButtonGroup>

}