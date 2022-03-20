import { AxiosError } from "axios";
import snackbar from "../../components/snackbar";

export const handleAxiosError = (error: AxiosError) => {
    if(error.response){
        if(error.response.data){
            snackbar.error(error.response.data.error);
            return;
        }
    }
} 