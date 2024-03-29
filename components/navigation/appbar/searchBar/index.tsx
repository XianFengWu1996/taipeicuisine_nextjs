import { styled, Typography } from "@mui/material";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { useAppSelector } from "../../../../store/store";
import { isEmpty } from "lodash";
import { handleCatchError } from "../../../../utils/errors/custom";
import { MoonLoader } from "react-spinners";
import { PublicMenuDialog } from "../../../menu/publicMenuDialog";
import { SearchBarWithButton } from "./SearchBarWithButton";
import { InStockSearchResult } from "./inStock";
import { OutOfStockSearchResult } from "./outOfStock";

const SearchBarContainer = styled('div')(() => ({
  position: 'absolute', 
  width: '100%', height: '100%', 
  zIndex: 9999, 
  backgroundColor:'#ecf2ff', 
  overflowY: 'auto'
}))

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
      setOutOfStock([])
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

    const handleDisplayResult = () => {
      if(!loading){
        return <>
            <InStockSearchResult 
              dishes={dish_result} 
              handleOnClick={(dish: IDish) => {
                setSelected(dish)
                setOpen(true);
              }}
            />
            
            <OutOfStockSearchResult 
              dishes={out_of_stock}
            />
        </>
      }
    }

    return <SearchBarContainer>
        <SearchBarWithButton handleOnSearch={handleOnSearch}/>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <MoonLoader size={35}  color={blue[500]} loading={loading}/>
        </div>

        {
          !isEmpty(error) && <Typography sx={{ textAlign: 'center', color: 'red', fontWeight: 500, fontSize: 17}}>{error}</Typography>
        }

        {/* display both the in stock and out of stock results */} 
        { handleDisplayResult()} 

       <PublicMenuDialog open={open} handleClose={() => setOpen(false)} dish={selected}/>
    </SearchBarContainer>
}