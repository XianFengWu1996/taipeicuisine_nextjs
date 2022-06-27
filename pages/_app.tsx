import '../styles/globals.css'
import '../styles/app.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '../components/snackbar'
import axios from 'axios'
import { Provider } from 'react-redux'
import {store, persistor} from '../store/store'
import NProgress from 'nprogress'
import Router from 'next/router'
import "nprogress/nprogress.css";
import { ThemeProvider } from '@emotion/react'
import { muiCustomTheme } from '../components/theme'
import { CssBaseline } from '@mui/material'
import { AuthDialog } from '../components/auth/authDialog'

import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head'
import Script from 'next/script'
import { SearchBar } from '../components/navigation/appbar/searchBar'


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

NProgress.configure({
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
        <title>Taipei Cuisine</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Script strategy={'beforeInteractive'} src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=places`} />
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
          <ThemeProvider theme={muiCustomTheme}>
          <CssBaseline />
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
            }}>
              <SnackbarUtilsConfigurator />
                <Component {...pageProps} />
              <AuthDialog />
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
    </Provider>
  </>
}

export default MyApp
