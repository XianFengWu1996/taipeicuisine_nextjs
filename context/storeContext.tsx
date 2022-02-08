import axios, { AxiosError } from "axios";
import Router from "next/router";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import Snackbar from '../components/snackbar'
import { signOut } from 'firebase/auth'
import { fbAuth } from "../pages/_app";
import { handleAdminAxiosError } from "../utils/functions/errors";


//  CREATE CONTEXT 
type IStoreContextType = {
    hours: IHours[],
    menus: IMenu[],
    serverOn: boolean,
    updateRequired: boolean,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => void,
    getStoreData: (storeData: IStore) => void,
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) =>  void;
    updateHourToDB:() =>  void,
    toggleServerStatus: () => void,
    getMenuData: (menus: IMenu[]) => void,
}

const StoreContextDefaultValue: IStoreContextType = {
    hours: [],
    menus: [],
    serverOn: false,
    updateRequired: false,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => {},
    getStoreData: (storeData: IStore) => {},
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) => {},
    updateHourToDB: () => {},
    toggleServerStatus: () => {},
    getMenuData: (menus: IMenu[]) => {}
};
const StoreContext = createContext<IStoreContextType>(StoreContextDefaultValue) ;

export function useStore() {
    return useContext(StoreContext);
}

// CREATE PROVICER
type Props = {
    children: ReactNode;
};

export function StoreProvider({ children }: Props) {
    const [hours, setHours] = useState<IHours[]>([]);
    const [serverOn, setServerOn] = useState<boolean>(false);
    const [menus, setMenus] = useState<IMenu[]>([]);

    const [updateRequired, setUpdateRequired] = useState(false);

    // SETTING THE open_for_business PROPERTY SPECIFIC DAY OF THE WEEK
    const closeForDayOfWeek = (dayOfWeek: string, isOpen: boolean) => {
        let index = hours.findIndex((el) => el.day_of_week == dayOfWeek);
        let tempHours = [...hours];
        tempHours[index].open_for_business = isOpen
        setHours(tempHours);
        setUpdateRequired(true);
    }

    const getStoreData = (storeData: IStore) => {
        setHours([...storeData.hours]);
        setServerOn(_ => storeData.server_is_on);
    }

    // SETTING THE open_hour and close_hour FOR A SPECIAL DAY OF THE WEEK
    const editHours = (dayOfWeek: string, openHr: number, closeHr:number) => {
        let index = hours.findIndex(el => el.day_of_week === dayOfWeek);
        let tempHours = [...hours];
        tempHours[index].open_hour = openHr;
        tempHours[index].close_hour = closeHr;
        setHours(tempHours);
        setUpdateRequired(true);
    }

    const updateHourToDB = () => {
        axios.post('http://localhost:5001/foodorder-43af7/us-central1/store/hours', { hours })
        .then((response) => {
            // if the status is 200, then we update the 
            if(response.status === 200){
                setUpdateRequired(false);
                Snackbar.success('Hours has been updated')
            }
        }).catch((error: Error | AxiosError) => {
            handleAdminAxiosError(error, 'Failed to update hours');
        });    
    }

    const toggleServerStatus = async () => {
        axios.post('http://localhost:5001/foodorder-43af7/us-central1/store/status', {
            server_is_on: !serverOn
        }).then((response) => {
            if(response.status === 200){
                setServerOn((prev) => !prev);
                Snackbar.success('Server status has been update')
            }
        }).catch((error) => {
            handleAdminAxiosError(error, 'Failed to update server status');
        });
    }

    const getMenuData = (menus: IMenu[]) => {
        setMenus([]);
        setMenus([...menus])
    }


    const value = {
        hours,
        menus,
        serverOn,
        updateRequired,
        closeForDayOfWeek,
        getStoreData,
        editHours,
        updateHourToDB,
        toggleServerStatus,
        getMenuData,
    }
    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}

