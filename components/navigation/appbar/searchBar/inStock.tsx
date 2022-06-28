export const InStockSearchResult = () => {
    
}
// import { Grid } from "@mui/material";
// import { isEmpty } from "lodash";

// export const InStockSearchResult = () => {
//     return  <Grid container spacing={2} sx={{ pb: 10, px: 5, width: '100vw'}}>
//     {
//       !isEmpty(dish_result) && dish_result.map((dish) => {
//         return dish.in_stock && <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
//           <Card onClick={() => {
//               setSelected(dish)
//               setOpen(true);
//             }}>
//             <CardContent>
//               <Typography sx={{ fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.ch_name} {dish.is_spicy && <GoFlame color='red'/>}</Typography>
//               <Typography sx={{ fontSize: 11, fontWeight: 500}}>{dish.en_name}</Typography>
//               <Typography sx={{ fontSize: 12}}>${dish.price.toFixed(2)}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       })
//     }
//     </Grid>
// }