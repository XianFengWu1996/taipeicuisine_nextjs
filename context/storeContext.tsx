import axios from "axios";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";


//  CREATE CONTEXT 
type IStoreContextType = {
    hours: IHours[],
    serverOn: boolean,
    updateRequired: boolean,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => void,
    getStoreData: (storeData: IStore) => void,
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) =>  void;
    updateHourToDB:() =>  void,
    toggleServerStatus: () => void,
}

const StoreContextDefaultValue: IStoreContextType = {
    hours: [],
    serverOn: false,
    updateRequired: false,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => {},
    getStoreData: (storeData: IStore) => {},
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) => {},
    updateHourToDB: () => {},
    toggleServerStatus: () => {}
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
        setServerOn(data => storeData.server_is_on);
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

    const updateHourToDB = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:5001/foodorder-43af7/us-central1/store/hours',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials:true,
                data: {
                    hours
                }
            })
            if(response.status === 200) {
                setUpdateRequired(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleServerStatus = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:5001/foodorder-43af7/us-central1/store/status',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials:true,
                data: {
                    server_is_on: !serverOn
                }
            })

            if(response.status === 200) {
                setServerOn((prev) => !prev);
            }

        } catch (error) {
            console.log(error);
        }
    }


    const value = {
        hours,
        serverOn,
        updateRequired,
        closeForDayOfWeek,
        getStoreData,
        editHours,
        updateHourToDB,
        toggleServerStatus
    }
    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}