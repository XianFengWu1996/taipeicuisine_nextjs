import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { isEmpty } from "lodash"
import { useState } from "react"
import { getCurrentDish } from "../../../store/slice/menuSlice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { PublicMenuDialog } from "../../dialogs/publicMenuDialog/publicMenuDialog"
import { DishCard } from "./DishCard"

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
    const [open, setOpen] = useState<boolean>(false);
    const { selectedCategory } = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();

    const handleOnClose = () => {
        setOpen(false);
    }

    const handleOpen = (dish: IDish) => {
        setOpen(true);
        dispatch(getCurrentDish(dish))
    }

    return <CardContainer>
        <Grid container spacing={2}>
            {
                !isEmpty(selectedCategory) && selectedCategory.dishes.map((dish) => {
                    return dish.in_stock && <DishCard key={dish.id} dish={dish} handleOnClick={() =>  handleOpen(dish)} />
                })
            }
        </Grid>

        <PublicMenuDialog
            open={open}
            handleClose={handleOnClose}
        /> 
 
</CardContainer>
}