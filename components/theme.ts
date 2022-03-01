import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const muiCustomTheme = createTheme({
  palette: {
    background: {
      default: "#ecf2ff",
      paper: "#fcfcfc"
    },
    primary: {
      main: red[400]
    }
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
    
  }
});