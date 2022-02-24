import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
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


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// place all varaibles into environment variables
const app = initializeApp({
  apiKey: "AIzaSyCzR4MZL_NzPEkk6yRPma7Mj4TA2CTvJyY",
  authDomain: "foodorder-43af7.firebaseapp.com",
  databaseURL: "https://foodorder-43af7.firebaseio.com",
  projectId: "foodorder-43af7",
  storageBucket: "foodorder-43af7.appspot.com",
  messagingSenderId: "369761240989",
  appId: "1:369761240989:web:ddda297893ae41b16fd174",
  measurementId: "G-R59065JET5"
})

export const fbAuth = getAuth(app);

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
          <SnackbarProvider maxSnack={3}>
            <SnackbarUtilsConfigurator />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
    </Provider>
  </>
}

export default MyApp
