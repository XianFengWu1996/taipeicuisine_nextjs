import { FirebaseError } from "firebase/app"
import snackbar from "../../components/snackbar";

export const handleFirebaseAuthError = (error: Error) => {
    let err = error as FirebaseError;

    switch(err.code){
        case 'auth/invalid-email': 
            snackbar.error('The email / password is invalid')
        break;

        case 'auth/user-disabled': 
            snackbar.error('Account has been disable, please contact business for more detail')
        break;

        case 'auth/user-not-found': 
            snackbar.error('Please double check your email / password')
        break;

        case 'auth/wrong-password': 
            snackbar.error('The email / password is invalid')
        break;

        case 'auth/invalid-credential': 
            snackbar.error('The credential is malformed or has expired')
        break;

        case 'auth/operation-not-allowed': 
            snackbar.error('Operation is not allowed')
        break;

        case 'auth/account-exists-with-different-credential': 
            snackbar.error("Account already exist")
        break;

        case 'auth/popup-blocked': 
            snackbar.error("The popup was blocked by the browser")
        break;

        case 'auth/cancelled-popup-request': 
            snackbar.warning("Login has been cancelled")
        break;

        case 'auth/popup-closed-by-user': 
            snackbar.warning("Login pop-up is closed")
        break;

        default: 
        break;
    }
}