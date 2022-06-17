import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { GoFlame } from "react-icons/go"

const DishText = styled(Typography)(() => ({
    fontSize: 20, 
    fontWeight: 600
}))

const PriceText = styled(Typography)(() => ({
    fontSize: 15, 
    fontStyle: 'italic', 
    fontWeight: 500
}))

export const ItemDetails = ({dish}: {dish: IDish}) => {
    return <>
        <DishText>
            {dish.label_id}. {dish.en_name} {dish.ch_name} 
            {isEmpty(dish.variant) && dish.is_spicy && <GoFlame color="red"/> }
        </DishText>
        <PriceText>${dish.price}</PriceText>
        <Typography>{dish.description}</Typography>
    </>
}