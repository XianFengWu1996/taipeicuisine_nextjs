import { Button, Card, CardContent, InputBase, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { blue, red } from "@mui/material/colors";
import { useAppSelector } from "../../../store/store";
import { isEmpty } from "lodash";
import { handleCatchError } from "../../../utils/errors/custom";


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

    return <div style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: 9999, backgroundColor:'#ecf2ff', }}>
          <div style={{ width: '100%', display:' flex', justifyContent: 'center', alignItems: 'center', marginTop: 40,}}>
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
        {
          !isEmpty(dish_result) && dish_result.map((dish) => {
            return  <Card key={dish.id}>
            <CardContent>
              <Typography>{dish.en_name}</Typography>
              <Typography>{dish.ch_name}</Typography>
              <Typography>{dish.price}</Typography>
            </CardContent>
          </Card>
          })
        }
       


        
    </div>
}