import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import snackbar from "../../components/snackbar";
import { updateCustomerName } from "../../store/slice/customerSlice";
import { setSaveNameLoading, setShowCustomerCard } from "../../store/slice/settingSlice";
import store from "../../store/store";
import { handleCatchError, NoTokenFoundError } from "../errors/custom";
import { fbAuth } from "./auth";

// retrieve order history
export const getOrderHistory = async (token: string) => {
    try {
        const history_result = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/order_history`,
            headers: {
                'Authorization':  `Bearer ${token}`,
            }
        })
        return history_result.data.order_list as IPublicOrder[];

    } catch (error) {
        console.log(error);
        handleCatchError(error as Error, 'Failed to retrieve order history')
    } 

}

// retrieve reward history
export const getRewardHistory = async (token: string) => {
    try {
        const reward_result = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/reward_history`,
            headers: {
                'Authorization':  `Bearer ${token}`,
            }
        })

        return reward_result.data.rewards as IReward
    } catch (error) {
        console.log(error);
        handleCatchError(error as Error, 'Failed to retrieve reward history')
    }
}

// retrieve customer information
export const getCustomerInfo = async  (token: string | undefined) => {
    if(!token) {
        throw new NoTokenFoundError();
    }

    let result = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return result.data as ICustomer
}

// handle update name in the front end for the card
export const updateNameInCard = async(name: string, original_name: string, ) => {
    // if the no change was made, close the collapse card
    if(original_name === name){
       return store.dispatch(setShowCustomerCard(false));
    }

    try {
        store.dispatch(setSaveNameLoading(true)); // start the loading 
        let token = await fbAuth.currentUser?.getIdToken();

        await handleUpdateName(name, token);

        store.dispatch(updateCustomerName(name)); // update the redux store
        store.dispatch(setShowCustomerCard(false)); // close the card
        snackbar.success('Name has been updated'); // display message to user

    } catch (error) {
        handleCatchError(error as Error, 'Failed to update name');
    } finally {
        store.dispatch(setSaveNameLoading(false)); // end the loading
    }
}

// handle update name in the front end for the account
export const updateNameInAccount = async(name: string , original_name: string,setLoading:  Dispatch<SetStateAction<boolean>> ) => {
    try {
        setLoading(true);

        if(name != original_name){
            let token = await fbAuth.currentUser?.getIdToken();
            await handleUpdateName(name, token);

            snackbar.success('Name has been updated'); // display message to user
        }

    } catch (error) {
        handleCatchError(error as Error, 'Failed to update name');
    } finally {
        setLoading(false);
    }
}

// make request to the backend to update the name
export const handleUpdateName = async (name: string, token: string | undefined) => {
    if(!token){
        throw new NoTokenFoundError();
    }

    await axios.patch(`${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/name`, { name }, {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    })
}