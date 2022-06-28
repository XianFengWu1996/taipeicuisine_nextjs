import { Card, CardContent, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { GoFlame } from "react-icons/go";

interface IInStockSearchResult {
    dishes: IDish[],
    handleOnClick: (dish:IDish) => void
}

export const InStockSearchResult = ({ dishes, handleOnClick }:IInStockSearchResult) => {
    return  <Grid container spacing={2} sx={{ pb: 10, px: 5, width: '100vw'}}>
    {
      !isEmpty(dishes) && dishes.map((dish) => {
        return dish.in_stock && <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
          <Card onClick={() => handleOnClick(dish)}>
            <CardContent>
              <Typography sx={{ fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.ch_name} {dish.is_spicy && <GoFlame color='red'/>}</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 500}}>{dish.en_name}</Typography>
              <Typography sx={{ fontSize: 12}}>${dish.price.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      })
    }
    </Grid>
}