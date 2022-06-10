import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { getInitialMenuData } from "../../store/slice/menuSlice";
import store from "../../store/store";
import { handleCatchError } from "../errors/custom";
import { hasExpired } from "./time";

interface IFetchMenu {
    setLoading: Dispatch<SetStateAction<boolean>> | null,
    expiration: number,
}

export const fetchMenu = async ({ setLoading,expiration }: IFetchMenu) => {
    try {
        if(setLoading) setLoading(true);

        if(hasExpired(expiration)){
            let response = await axios.get(`${process.env.NEXT_PUBLIC_CF_URL}/store/menus`);

            let menus: IMenu[] = [];
            menus.push(response.data.special)
            menus.push(response.data.fullday);
            menus.push(response.data.lunch);
            
            store.dispatch(getInitialMenuData({ menus: menus, expiration: response.data.expiration }))
        }
    } catch (error) {
        handleCatchError((error as Error), 'Failed to fetch menu')
    } finally {
        if(setLoading) setLoading!(false);
    }
}