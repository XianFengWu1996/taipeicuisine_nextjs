import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import snackbar from "../../components/snackbar";
import { updateCustomerName } from "../../store/slice/customerSlice";
import { setShowCustomerCard } from "../../store/slice/settingSlice";
import store from "../../store/store";
import { handleCatchError } from "../errors/custom";
import { NoTokenFoundError } from "../errors/noTokenError";
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

export const handleUpdateName = async (
        name: string,
        original_name: string,
        setLoading:  Dispatch<SetStateAction<boolean>>, 
        account: boolean 
    ) => {

    try {

        if(!account && name === original_name){
            return store.dispatch(setShowCustomerCard(false)); // close the card
        }

        let token = await fbAuth.currentUser?.getIdToken();
            
        if(!token) throw new NoTokenFoundError()

        setLoading(true);

        await axios.patch(`${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/name`, { name }, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        snackbar.success('Name has been updated'); // display message to user

        if(!account){
            store.dispatch(updateCustomerName(name)); // update the redux store
            store.dispatch(setShowCustomerCard(false)); // close the card
        }
    } catch (error) {
        handleCatchError(error as Error, 'Failed to update name');
    } finally {
        setLoading(false);
    }
}
