import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { breakpoints } from '@mui/system';

const theme = createTheme()

export const muiCustomTheme = createTheme({
  palette: {
    background: {
      default: "#ecf2ff",
      paper: "#fcfcfc"
    },
    primary: {
      main: red[400],
      light: red[200],
      dark: red[500],
      contrastText: '#fff'
    },
    // secondary: {
    //   main: green[500],
    // },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontSize: '30px',
      fontWeight: 700,
      margin: '20px 0 5px 0',
      [theme.breakpoints.down('md')]: {
        fontSize: '23px',
      },
    
    }
  },
  
});