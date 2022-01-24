import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";


//  CREATE CONTEXT 
type IStoreContextType = {
    hours: hours[],
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => void,
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) =>  void;
}

const StoreContextDefaultValue: IStoreContextType = {
    hours: [],
    closeForDayOfWeek: (dayOfWeek: string, isOpen: boolean) => {},
    editHours: (dayOfWeek: string, openHr: number, closeHr: number) => {},
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

    // SETTING THE open_for_business PROPERTY SPECIFIC DAY OF THE WEEK
    const closeForDayOfWeek = (dayOfWeek: string, isOpen: boolean) => {
        let index = hours.findIndex((el) => el.day_of_week == dayOfWeek);
        let tempHours = [...hours];
        tempHours[index].open_for_business = isOpen
        setHours(tempHours);
    }

    // SETTING THE open_hour and close_hour FOR A SPECIAL DAY OF THE WEEK
    const editHours = (dayOfWeek: string, openHr: number, closeHr:number) => {
        let index = hours.findIndex(el => el.day_of_week === dayOfWeek);
        let tempHours = [...hours];
        tempHours[index].open_hour = openHr;
        tempHours[index].close_hour = closeHr;
        setHours(tempHours);
    }


    const value = {
        hours,
        closeForDayOfWeek,
        editHours,
    }
    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}