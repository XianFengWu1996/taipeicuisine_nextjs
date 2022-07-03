import { Button, InputBase } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from "react";
import { blue } from "@mui/material/colors";


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
  
  const SearchIconWrapper = styled('div')(() => ({
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
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

interface ISearchBarWithButton {
    handleOnSearch: (search_value: string) =>  void 
}

export const SearchBarWithButton = ({ handleOnSearch }:ISearchBarWithButton) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleOnSearchValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.target.value);
    }

    return <div style={{ width: '100%', display:' flex', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 20}}>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleOnSearchValueChange}
            />
        </Search>
        <Button 
            variant="contained" 
            size="large" 
            sx={{ ml: 2, py:2, px:4, backgroundColor: blue[400]}} 
            onClick={() => handleOnSearch(searchValue)}
        >Search</Button>
    </div>
}