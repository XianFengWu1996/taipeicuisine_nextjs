import axios, { AxiosError } from "axios";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { fbAuth } from "../../pages/_app";
import displaySnackBar from '../../components/snackbar'

export const handleAdminAxiosError = (error: Error | AxiosError, genericMsg: string) => {
    if(axios.isAxiosError(error)){
        if(error.response){
            if(error.response.status === 401){
                Router.push('/admin/login');
                signOut(fbAuth);
                displaySnackBar.error(error.message ?? 'Unauthorize');
                return;
            }
        }
    } 
    displaySnackBar.error(error.message ?? genericMsg);
}