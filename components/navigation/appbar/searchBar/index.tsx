import { Button, Card, CardActions, CardContent, Grid, InputBase, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { useAppSelector } from "../../../../store/store";
import { isEmpty } from "lodash";
import { handleCatchError } from "../../../../utils/errors/custom";
import { GoFlame } from "react-icons/go";
import { MoonLoader } from "react-spinners";
import { PublicMenuDialog } from "../../../menu/publicMenuDialog";
import { SearchBarWithButton } from "./SearchBarWithButton";
import { InStockSearchResult } from "./inStock";




export const SearchBar = () => {
    const [dish_result, setDishResult] = useState<IDish[]>([]);
    const [out_of_stock, setOutOfStock] = useState<IDish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const { dishes } = useAppSelector(state => state.menus)

    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<IDish>({} as IDish);

    const handleOnSearch = (searchValue:string) => {
      setError(''); 
      setDishResult([]);
      setLoading(true);

      try {
        if(isEmpty(searchValue)){
          return setError('Please enter a search term...')
        }
        let temp_arr:IDish[] = [];
        let temp_out_of_stock:IDish[] = [];

        dishes.forEach((dish) => {
          if(dish.en_name.toLowerCase().includes(searchValue.toLowerCase()) || dish.ch_name.toLowerCase().includes(searchValue.toLowerCase())){
            if(dish.in_stock){
              temp_arr.push(dish);
            } else {
              temp_out_of_stock.push(dish);
            }
          }
        })

        if(temp_arr.length === 0 && temp_out_of_stock.length === 0){
          return setError('No result was found...')
        }

        setDishResult(temp_arr);
        setOutOfStock(temp_out_of_stock);
      } catch (error) {
        handleCatchError(error as Error, 'Failed to find the item')
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      }
    }

    return <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 9999, backgroundColor:'#ecf2ff', overflowY: 'auto'}}>
         
        <SearchBarWithButton handleOnSearch={handleOnSearch}/>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <MoonLoader size={35}  color={blue[500]} loading={loading}/>
        </div>

        {
          !isEmpty(error) && <Typography sx={{ textAlign: 'center', color: 'red', fontWeight: 500, fontSize: 17}}>{error}</Typography>
        }

        {
          !loading && <>
            <InStockSearchResult 
              dishes={dish_result} 
              handleOnClick={(dish: IDish) => {
                setSelected(dish)
                setOpen(true);
              }}
            />
            
            {
              !isEmpty(out_of_stock) && <Typography sx={{ fontSize: 22, fontWeight: 600, my: 1, ml: 5}}>Out Of Stock</Typography>
            }
            <Grid container spacing={2} sx={{ pb: 20, px: 5, width: '100vw'}}>
            {
              !isEmpty(out_of_stock) && out_of_stock.map((dish) => {
                return  <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
                  <Card >
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
       

       <PublicMenuDialog open={open} handleClose={() => setOpen(false)} dish={selected}/>
    </div>
}