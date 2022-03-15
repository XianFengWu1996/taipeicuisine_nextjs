import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import snackbar from '../../components/snackbar';

// place all varaibles into environment variables
export const app = initializeApp({
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