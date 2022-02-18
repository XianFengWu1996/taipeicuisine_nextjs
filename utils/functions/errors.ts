import axios, { AxiosError } from "axios";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { fbAuth } from "../../pages/_app";
import snackbar from "../../components/snackbar";
import { v4 } from 'uuid'


export const handleAdminTryCatchError = (error: unknown, genericMsg?: string) => {
    // check if the error is an axios error
    if(axios.isAxiosError(error)){
        let err = error as AxiosError; // use axios error as the type 

        if(err.response){
            switch(err.response.status){
                // 401 - unauthorize request
                case 401:
                    signOut(fbAuth);
                    Router.push('/admin/login');
                    snackbar.error('Session has expired, please re-login')
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

export const checkTokenInToken = (cookies: string | undefined) => {
    if(!cookies?.includes('ID_TOKEN')){
        // if no token found, redirect the request back to login page with redirect query
        return {
            redirect: {
                destination: `/admin/login?redirect=${v4()}`,
                permanent: false,
            }, 
            props: {}
        }
    }
}

export const handleAdminNotAuthRedirect = (error : { msg: string, code: number}) => {
    // handle client side http request, if error returns an 401 error code
    if(error){
        if(error.code === 401){
            signOut(fbAuth);
            Router.push('/admin/login');
            snackbar.error(error.msg);
            return;
        }

        snackbar.error(error.msg)
    }
}