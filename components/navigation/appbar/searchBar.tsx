import { Button, Card, CardActions, CardContent, Grid, InputBase, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { blue, red } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { isEmpty } from "lodash";
import { handleCatchError } from "../../../utils/errors/custom";
import { GoFlame } from "react-icons/go";
import { HashLoader, MoonLoader } from "react-spinners";
import { PublicMenuDialog } from "../../menu/publicMenuDialog";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    border: '1.5px solid #000',
    backgroundColor: '#ecf2ff',
    '&:hover': {
      backgroundColor: '#eff3fc',
    },
    width: '40%',
    padding: '10px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '10px',
    paddingBottom: '27px'
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //   [theme.breakpoints.up('md')]: {
    //     width: '20ch',
    //   },
    },
  }));




export const SearchBar = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [dish_result, setDishResult] = useState<IDish[]>([]);
    const [out_of_stock, setOutOfStock] = useState<IDish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const { dishes } = useAppSelector(state => state.menus)

    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<IDish>({} as IDish);

    const handleOnSearch = () => {
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
          <div style={{ width: '100%', display:' flex', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 20}}>
              <Search>
                  <SearchIconWrapper>
                      <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={(e) => {
                          setSearchValue(e.target.value);
                      }}
                  />
              </Search>
              <Button variant="contained" size="large" sx={{ ml: 2, py:2, px:4, backgroundColor: blue[400]}} onClick={handleOnSearch}>Search</Button>
          </div>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <MoonLoader size={35}  color={blue[500]} loading={loading}/>
        </div>

        {
          !isEmpty(error) && <Typography sx={{ textAlign: 'center', color: 'red', fontWeight: 500, fontSize: 17}}>{error}</Typography>
        }

        {
          !loading && <>
            <Grid container spacing={2} sx={{ pb: 10, px: 5, width: '100vw'}}>
            {
              !isEmpty(dish_result) && dish_result.map((dish) => {
                return dish.in_stock && <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
                  <Card onClick={() => {
                      console.log('clicked')
                      setSelected(dish)
                      setOpen(true);
                    }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.ch_name} {dish.is_spicy && <GoFlame color='red'/>}</Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 500}}>{dish.en_name}</Typography>
                      <Typography sx={{ fontSize: 12}}>${dish.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              })
            }
            </Grid>
            
            {
              !isEmpty(out_of_stock) && <Typography>Out Of Stock Items </Typography>
            }
            <Grid container spacing={2} sx={{ pb: 20, px: 5, width: '100vw'}}>
            {
              !isEmpty(out_of_stock) && out_of_stock.map((dish) => {
                return  <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
                  <Card >
                    <CardContent>
                      <Typography sx={{ fontSize: 13, fontWeight: 600}}>{dish.label_id}.{dish.ch_name} {dish.is_spicy && <GoFlame color='red'/>}</Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 500}}>{dish.en_name}</Typography>
                      <Typography sx={{ fontSize: 12}}>${dish.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <Typography sx={{ color: 'red', fontWeight: 500 }}>Currently Out of Stock</Typography>
                    </CardActions>
                  </Card>
                </Grid>
              })
            }
            </Grid>
          </>
        }
       

       <PublicMenuDialog
            open={open}
            handleClose={() => setOpen(false)}
            dish={selected}
        />
       


        
    </div>
}