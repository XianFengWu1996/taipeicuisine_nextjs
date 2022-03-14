import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '../components/snackbar'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from '../store/store'
import NProgress from 'nprogress'
import Router from 'next/router'
import "nprogress/nprogress.css";
import { ThemeProvider } from '@emotion/react'
import { muiCustomTheme } from '../components/theme'
import { CssBaseline } from '@mui/material'
import { AuthDialog } from '../components/auth/authDialog'

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
        <ThemeProvider theme={muiCustomTheme}>
        <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <SnackbarUtilsConfigurator />
            <Component {...pageProps} />
            <AuthDialog />
          </SnackbarProvider>
        </ThemeProvider>
    </Provider>
  </>
}

export default MyApp
