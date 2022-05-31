import axios from "axios";
import snackbar from "../../components/snackbar";
import { handleFirebaseAuthError } from "./firebaseError";
import { handleAxiosError } from "./handleAxiosError";

// CUSTOM ERROR FOR NOT AUTHORIZE 
export class NotAuthorizeError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ? msg : 'Not authorized';
        this.name = 'NotAuthorizeError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isNotAuthError = (error: Error) => {
    return error.name === 'NotAuthorizeError'
}


// NO TOKEN FOUND ERROR
export class NoTokenFoundError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ? msg : 'No Token Found';
        this.name = 'NoTokenFoundError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isNoTokenFoundError = (error: Error) => {
    return error.name === 'NoTokenFoundError'
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