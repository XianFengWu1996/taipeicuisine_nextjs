import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '../components/snackbar'
import axios from 'axios'
import { wrapper } from '../store/store'



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

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <SnackbarProvider maxSnack={3}>
      <SnackbarUtilsConfigurator />
      <Component {...pageProps} />
    </SnackbarProvider>
  </>
}

export default wrapper.withRedux(MyApp) 
