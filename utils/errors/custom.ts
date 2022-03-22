import axios from "axios";
import snackbar from "../../components/snackbar";
import { handleFirebaseAuthError } from "./firebaseError";
import { handleAxiosError } from "./handleAxiosError";

// CUSTOM ERROR FOR NOT AUTHORIZE 
export class NotAuthorizeError extends Error{
    constructor(msg: string){
        super(msg);

        this.message = msg;
        this.name = 'NotAuthorizeError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isNotAuthError = (error: Error) => {
    return error.name === 'NotAuthorizeError'
}

export const handleCatchError = (err: Error, msg: string) => {
    if((err as Error).name === 'FirebaseError'){
        handleFirebaseAuthError(err);
        return;
      }

      if(axios.isAxiosError(err)){
        handleAxiosError(err);
        return;
      }

      snackbar.error(err.message ?? msg)
}