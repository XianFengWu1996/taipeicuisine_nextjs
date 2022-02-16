import axios, { AxiosError } from "axios";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { fbAuth } from "../../pages/_app";
import snackbar from "../../components/snackbar";

export const handleAdminTryCatchError = (error: unknown, genericMsg?: string) => {
    // check if the error is an axios error
    if(axios.isAxiosError(error)){
        let err = error as AxiosError; // use axios error as the type 

        if(err.response){
            switch(err.response.status){
                // 401 - unauthorize request
                case 401:
                    snackbar.error('Unauthorize request')
                    Router.push('/admin/login');
                    signOut(fbAuth);
                    break;
                // 400 - request fail, check for reason
                case 400:
                    if(err.response.data){
                        snackbar.error(err.response.data.error ?? genericMsg)
                    }
                    break;
                default: 
                    snackbar.error('Unexpected error')
                    break;
            }
        }
       
    } else {
        snackbar.error((error as Error).message ?? 'Unexpected error')
    }
}