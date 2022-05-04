import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { setLoginDialog } from '../../store/slice/customerSlice';
import store from '../../store/store';
import { handleCatchError } from '../errors/custom';


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

export const token = async () => {
  return fbAuth.currentUser?.getIdToken();
}



export const checkAndRedirect = (query: ParsedUrlQuery) => {
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

interface IHandleLogin {
  email: string,
  password: string,
  handleSuccess: () => void,
  handleFail: () => void,
  query: ParsedUrlQuery,
}

export const handleEmailLogin = async ({ email, password, handleSuccess, handleFail,query}: IHandleLogin) => {
    try{
      let user = await signInWithEmailAndPassword(fbAuth, email, password); // try to sign in

      await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/login`, null, {
        headers: {
          'authorization': `Bearer ${await user.user.getIdToken()}`
        }
      })
      handleSuccess(); // handle if the request is successful
      checkAndRedirect(query); // check if the page needs to be redirected
    } catch (e) {
      handleFail();
      handleCatchError(e as Error, 'Fail to login');
    }
}

interface IGoogleLogin {
  query: ParsedUrlQuery,
}

export const handleGoogleLogin = async (_:IGoogleLogin) => {
  try {
    const google_provider = new GoogleAuthProvider();

    let user = (await signInWithPopup(fbAuth, google_provider)).user;

    await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/login`, null, {
      headers: {
        'authorization': `Bearer ${await user.getIdToken()}`
      }
    })

    store.dispatch(setLoginDialog(false));
    checkAndRedirect(_.query); // check if the page needs to be redirected
  } catch (error) {
    handleCatchError(error as Error, 'Fail to login');  }
}

export const handleLogout = () => {
  signOut(fbAuth); // logout
}

export const handleSignUp = () => {
    
}

export const handleForgotPassword = () => {

}