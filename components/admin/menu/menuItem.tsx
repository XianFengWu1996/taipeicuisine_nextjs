import { Card, CardContent, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { getCurrentDish } from "../../../store/slice/menuSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store"

export const MenuItemList = () => {
    const dispatch = useAppDispatch();
    const { currentSelectedCategory } = useAppSelector(state => state.menus)

    return <div style={{ margin: '1.5rem 2rem'}}>
        <Grid container spacing={2}>
            {
                   currentSelectedCategory && currentSelectedCategory.dishes ? currentSelectedCategory.dishes.map((dish: IDish) => {
                    return <Grid key={dish.id} item xs={12} md={6}>
                           <Card style={{ minHeight: 120}} onClick={() => {
                               dispatch(getCurrentDish(dish));
                           }}>
                               <CardContent sx={{ display: 'flex'}}>
                                       {
                                           dish.pic_url && typeof dish.pic_url === 'string' ? <Image 
                                               src={dish.pic_url} 
                                               alt={`picture for ${dish.en_name}`} 
                                               width={125}
                                               height={80} 
                                           /> : null
                                       }
           
                                       <div style={{ padding: '0 1.5rem'}}>
                                           <Typography sx={{ fontWeight: 'bold', fontSize: 16}}>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                                           <Typography sx={{ fontWeight: 'bold', fontSize: '14px'}}>${dish.price.toFixed(2)}</Typography>
                                           <Typography>{dish.description}</Typography>
                                       </div>                                
                               </CardContent>
                           </Card>
                       </Grid>
                   }) : null
            }
        </Grid>
    </div>
}