import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import snackbar from '../../components/snackbar';

export const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FB_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
  })
  
export const fbAuth = getAuth(app);

interface IHandleLogin {
  email: string,
  password: string,
  handleSuccess: () => void,
  handleFail: () => void,
  query: ParsedUrlQuery,
}

export const checkAndRedirect = (query: ParsedUrlQuery) => {
  console.log(query)
  if(query.redirect){
    switch(query.redirect){
      case 'checkout':
        Router.push('/order/checkout')
        break;

      default: 
        break;

        
    }
  }
}

export const handleEmailLogin = async ({ email, password, handleSuccess, handleFail,query}: IHandleLogin) => {
    try{
      await signInWithEmailAndPassword(fbAuth, email, password);
      handleSuccess();
      checkAndRedirect(query);
    } catch (e) {
      handleFail();
      snackbar.error((e as FirebaseError).message ?? 'Fail to login')
    }
}

export const handleLogout = () => {
  signOut(fbAuth);
}

export const handleSignUp = () => {
    
}

export const handleForgotPassword = () => {

}