import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, signOut, FacebookAuthProvider, OAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword} from 'firebase/auth'
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import isEmail from 'validator/lib/isEmail';
import { setShowLoginDialog } from '../../store/slice/settingSlice';
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
      case 'account':
        Router.push('/account?redirect=account')
        break;
      default: 
        break;

        
    }
  }
}


export const handleEmailLogin = async ({ email, password}: IEmailLogin) => {
  let user = await signInWithEmailAndPassword(fbAuth, email, password); // try to sign in

  await axios({
    method: 'POST',
    headers: {
      'authorization': `Bearer ${await user.user.getIdToken()}`
    },
    url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/login`
  })
}

export const handleGoogleLogin = async (_:ISocialLogin) => {
  try {
    const google_provider = new GoogleAuthProvider();

    let user = (await signInWithPopup(fbAuth, google_provider)).user;

    await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/customer/login`, null, {
      headers: {
        'authorization': `Bearer ${await user.getIdToken()}`
      }
    })

    store.dispatch(setShowLoginDialog(false));
    checkAndRedirect(_.query); // check if the page needs to be redirected
  } catch (error) {
    handleCatchError(error as Error, 'Fail to login with Google');  
  }
}

export const handleAppleLogin = async (_:ISocialLogin) => {
 try {
    const apple_provider = new OAuthProvider('apple.com');

    const user = (await signInWithPopup(fbAuth, apple_provider)).user

    await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/login`, null, {
      headers: {
        'authorization': `Bearer ${await user.getIdToken()}`
      }
    })

    store.dispatch(setShowLoginDialog(false));
    checkAndRedirect(_.query); 
 } catch (error) {
   console.log(error);
    handleCatchError(error as Error, 'Fail to login with Google');  
 }
}

export const handleFacebookLogin = async(_:ISocialLogin) => {
  try {
    let facebook_provider = new FacebookAuthProvider();

    let user =  (await signInWithPopup(fbAuth, facebook_provider)).user;

    await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/auth/login`, null, {
      headers: {
        'authorization': `Bearer ${await user.getIdToken()}`
      }
    })
    store.dispatch(setShowLoginDialog(false));
    checkAndRedirect(_.query); // check if the page needs to be redirected
  } catch (error) {
    handleCatchError(error as Error, 'Fail to login with Facebook');  
  }
}

export const handleLogout = () => {
  signOut(fbAuth); // logout
}

export const handleSignUp = async ({ email, password} :IEmailLogin) => {
  let user = await createUserWithEmailAndPassword(fbAuth, email, password); // try to sign in

  await axios({
    method: 'POST',
    headers: {
      'authorization': `Bearer ${await user.user.getIdToken()}`
    },
    url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/login`
  })
}

export const handleForgotPassword = (email:string) => {
  if(isEmail(email)){
    sendPasswordResetEmail(fbAuth, email);
  }
}