import { Card, CardContent, Grid, Typography } from "@mui/material"
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCurrentDish } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { AdminMenuDialog } from "../dialogs/adminMenuDialog";
import { GoFlame } from 'react-icons/go'
import { MenuPreviewImage } from "../images";
import { PublicMenuDialog } from "../dialogs/publicMenuDialog/publicMenuDialog";


const CardContainer = styled('div')(({theme}) => ({
    margin: '1.5rem 5rem',
    [theme.breakpoints.down('md')]: {
        margin: '1.5rem 3.5rem',
    },
    [theme.breakpoints.down('sm')]: {
        margin: '1.5rem 1rem',
    },
}))

export const DishText = styled(Typography)(({theme}) => ({
    fontFamily: 'Montserrat',
    fontWeight: 700, 
    
    [theme.breakpoints.down('md')]:{
        fontSize: 16
    }
}))

export const PriceText = styled(Typography)(({theme}) => ({
    fontWeight: 600, 
    fontSize: 14,
    [theme.breakpoints.down('md')]:{
        fontSize: 12
    }
}))

export const MenuItemList = () => {
    const dispatch = useAppDispatch();
    const { selectedCategory } = useAppSelector(state => state.menus)
    const [open, setOpen] = useState<boolean>(false);

    const handleOnClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const renderDishCard = () => {
        if(!selectedCategory) return null    
        if(!selectedCategory.dishes) return null;

        return selectedCategory.dishes.map((dish: IDish) => {  
            if(!dish.in_stock) return null   

            return <Grid key={dish.id} item xs={12} md={6}>
                <Card style={{ minHeight: 140}} onClick={() => {
                    dispatch(getCurrentDish(dish));
                    handleOpen();
                }}>
                    <CardContent sx={{ display: 'flex'}}>
                            <MenuPreviewImage src={dish.pic_url} label={dish.en_name}/>

                            <div style={{ paddingLeft: 10}}>
                                <DishText>{dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy ? <GoFlame color="red"/> : null}</DishText>
                                <PriceText>${dish.price.toFixed(2)}</PriceText>
                            </div>                                
                    </CardContent>
                </Card>
            </Grid>
        })
    }

    return <CardContainer>
        <Grid container spacing={2}>
            { renderDishCard()}
        </Grid>

        <PublicMenuDialog
            open={open}
            handleClose={handleOnClose}
        /> 
     
    </CardContainer>
}