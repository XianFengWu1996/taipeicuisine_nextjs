import axios from "axios";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";


//  CREATE CONTEXT 
type IStoreContextType = {
    hours: hours[],
    updateRequired: boolean,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => void,
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) =>  void;
    updateHourToDB:() =>  void
}

const StoreContextDefaultValue: IStoreContextType = {
    hours: [],
    updateRequired: false,
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => {},
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) => {},
    updateHourToDB: () => {}
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
    const [hours, setHours] = useState([
        {
            day_of_week: 'Monday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
        {
            day_of_week: 'Tuesday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: false,
        },
        {
            day_of_week: 'Wednesday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
        {
            day_of_week: 'Thursday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
        {
            day_of_week: 'Friday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
        {
            day_of_week: 'Saturday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
        {
            day_of_week: 'Sunday',
            open_hour: 660,
            close_hour: 1300,
            open_for_business: true,
        },
    ])

    const [updateRequired, setUpdateRequired] = useState(false);

    // SETTING THE open_for_business PROPERTY SPECIFIC DAY OF THE WEEK
    const closeForDayOfWeek = (dayOfWeek: string, isOpen: boolean) => {
        let index = hours.findIndex((el) => el.day_of_week == dayOfWeek);
        let tempHours = [...hours];
        tempHours[index].open_for_business = isOpen
        setHours(tempHours);
        setUpdateRequired(true);
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


    const value = {
        hours,
        updateRequired,
        closeForDayOfWeek,
        editHours,
        updateHourToDB
    }
    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}