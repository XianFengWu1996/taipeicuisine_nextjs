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
import { Elements, } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { handleCatchError } from '../utils/errors/custom'


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

const stripePromise = loadStripe('pk_test_MQq0KVxKkSLUx0neZbdLTheo00iB1Ru6a0');

function MyApp({ Component, pageProps }: AppProps) {
  const [s_id, setSID] = useState<string | undefined>(Cookie.get('s_id'));

  const createPaymentIntent = async () =>  {
    try {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/create-payment-intent`,
        })

        setSID(Cookie.get('s_id'));
    } catch (error) {
      handleCatchError(error as Error, 'Failed to create intent');
    }
}

  useEffect(() => {
      // only create a payment if s_id is undefine or null
      if(!s_id){
       createPaymentIntent()
      } 
  }, [])
  

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
                {
                  s_id && <Elements stripe={stripePromise} options={{
                          clientSecret: s_id,
                          appearance: { theme: 'stripe'}
                  }}>
                    <Component {...pageProps} />
                  </Elements>
                }
              <AuthDialog />
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
    </Provider>
  </>
}

export default MyApp
