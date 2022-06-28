import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { GoFlame } from "react-icons/go"

interface IOutOfStockSearchResult {
    dishes: IDish[]
}

export const  OutOfStockSearchResult = ({ dishes } :IOutOfStockSearchResult) => {
    return <>
        {
            !isEmpty(dishes) && <Typography sx={{ fontSize: 22, fontWeight: 600, my: 1, ml: 5}}>Out Of Stock</Typography>
        }
        <Grid container spacing={2} sx={{ pb: 20, px: 5, width: '100vw'}}>
        {
            !isEmpty(dishes) && dishes.map((dish) => {
            return  <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.ch_name} {dish.is_spicy && <GoFlame color='red'/>}</Typography>
                        <Typography sx={{ fontSize: 11, fontWeight: 500}}>{dish.en_name}</Typography>
                        <Typography sx={{ fontSize: 12}}>${dish.price.toFixed(2)}</Typography>
                    </CardContent>
                <CardActions>
                    <Typography sx={{ color: 'red', fontWeight: 500, fontSize: 11 }}>Currently Out of Stock</Typography>
                </CardActions>
                </Card>
            </Grid>
            })
        }
        </Grid>
    </>
}