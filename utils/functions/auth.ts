import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
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

export const handleLogin = async (email: string, password: string) => {
    try{
      let user = await signInWithEmailAndPassword(fbAuth, email, password);

      setTimeout(() => {
        signOut(fbAuth);
      },10000)
    } catch (e) {
      snackbar.error((e as FirebaseError).message ?? 'Fail to login')
    }
}

export const handleLogout = () => {

}

export const handleSignUp = () => {
    
}

export const handleForgotPassword = () => {

}