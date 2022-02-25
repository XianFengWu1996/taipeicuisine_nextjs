import { Card, CardContent, Grid, Typography } from "@mui/material"
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCurrentDish } from "../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { AdminMenuDialog, PublicMenuDialog } from "./menuDialog";
import { GoFlame } from 'react-icons/go'
import { ImageWithFallback } from "../images";


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
    const { currentSelectedCategory } = useAppSelector(state => state.menus)
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleOnClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const renderDialog = () => {
        if(router.asPath === '/admin/menu'){
            return <AdminMenuDialog 
                open={open}
                handleClose={handleOnClose}
            />
        }
        return <PublicMenuDialog 
            open={open}
            handleClose={handleOnClose}
        /> 
    }

    return <CardContainer>
        <Grid container spacing={2}>
            {
                   currentSelectedCategory && currentSelectedCategory.dishes ? currentSelectedCategory.dishes.map((dish: IDish) => {
                    return <Grid key={dish.id} item xs={12} md={6}>
                           <Card style={{ minHeight: 120}} onClick={() => {
                               dispatch(getCurrentDish(dish));
                               handleOpen();
                           }}>
                               <CardContent sx={{ display: 'flex'}}>
                                       <ImageWithFallback src={dish.pic_url} label={dish.en_name} width={100} height={100}/>
           
                                       <div style={{ paddingLeft: 10}}>
                                           <DishText>{dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy ? <GoFlame color="red"/> : null}</DishText>
                                           <PriceText>${dish.price.toFixed(2)}</PriceText>
                                       </div>                                
                               </CardContent>
                           </Card>
                       </Grid>
                   }) : null
            }
        </Grid>

        {renderDialog()}
     
    </CardContainer>
}