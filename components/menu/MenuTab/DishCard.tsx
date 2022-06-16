import { Card, CardContent, Grid } from "@mui/material";
import { GoFlame } from "react-icons/go";
import { MenuPreviewImage } from "../../images";
import { DishText, PriceText } from "./MenuList";

interface IDishCardProps {
    dish: IDish,
    handleOnClick: () => void
}

export const DishCard = ({ dish, handleOnClick } : IDishCardProps) => {
    return <>
        <Grid item xs={12} md={6}>
                <Card style={{ minHeight: 140}} onClick={handleOnClick}>
                    <CardContent sx={{ display: 'flex'}}  >
                            <MenuPreviewImage src={dish.pic_url} label={dish.en_name}/>
                            <div style={{ paddingLeft: 10}}>
                                <DishText>{dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy && <GoFlame color="red"/> }</DishText>
                                <PriceText>${dish.price.toFixed(2)}</PriceText>
                            </div>                                
                    </CardContent>
                </Card>
            </Grid>
    </>
}