import axios from "axios";
import Router from "next/router";
import snackbar from "../../components/snackbar";
import { handleFirebaseAuthError } from "./firebaseError";
import { handleAxiosError } from "./handleAxiosError";
import { isInfoError } from "./infoError";
import { isNotAuthError } from "./notAuthError";

export const handleCatchError = (err: Error, msg: string) => {
  
      if((err as Error).name === 'FirebaseError'){
        return handleFirebaseAuthError(err);
      }

      if(axios.isAxiosError(err)){
        return handleAxiosError(err);
        ;
      }

      if(isNotAuthError(err)){
          return Router.replace('/order');
      }

      if(isInfoError(err)){
        return snackbar.info(err.message);
      }

      snackbar.error(err.message ?? msg)
}