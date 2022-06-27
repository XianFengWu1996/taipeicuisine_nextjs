import { Button, Card, CardContent, Grid, InputBase, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { blue, red } from "@mui/material/colors";
import { useAppSelector } from "../../../store/store";
import { isEmpty } from "lodash";
import { handleCatchError } from "../../../utils/errors/custom";
import { GoFlame } from "react-icons/go";


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
    const { dishes } = useAppSelector(state => state.menus)

    const handleOnSearch = () => {
      try {
        if(isEmpty(searchValue)){
          throw new Error('Please enter a search term..')
        }
        let temp_arr:IDish[] = [];
        dishes.forEach((dish) => {
          if(dish.en_name.toLowerCase().includes(searchValue.toLowerCase()) || dish.ch_name.toLowerCase().includes(searchValue.toLowerCase())){
            temp_arr.push(dish);
          }
        })
        setDishResult(temp_arr);
      } catch (error) {
        handleCatchError(error as Error, 'Failed to find the item')
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

        <Grid container spacing={2} sx={{ pb: 20, px: 5, width: '100vw'}}>
        {
          !isEmpty(dish_result) && dish_result.map((dish) => {
            return <Grid item xs={12} sm={6} md={6} lg={4} key={dish.id}>
              <Card >
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
       
       


        
    </div>
}