import React from "react";
import { CheckBoxWithDay } from "./checkboxWithDay";
import { EditHourCard } from "./editHourCard";
import { HourDisplayBox } from "./hourDisplayBox";

interface IHourEditDialogContentProps {
    day: IHours,
    handleCloseForDayOfWeek: (arg1: string, arg2: boolean) => void
    handleOnCardSave: (
        dayOfWeek: string,
        openHr: string, 
        openMin: string, 
        closeHr: string, 
        closeMin: string, 
    ) => void
}   

export const HourEditDialogContent = (props:IHourEditDialogContentProps) => {
    const [showCard, setShowCard] = React.useState(false);

    const toggleCard = () => { setShowCard(!showCard); }
    const closeCard = () => { setShowCard(false); }
    
    return  <>
        <div style={{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'space-between',
        }}>
            <CheckBoxWithDay day={props.day} onChanged={(_) => {
                props.handleCloseForDayOfWeek(props.day.day_of_week, _.target.checked);
            }}/>
            <HourDisplayBox  day={props.day} toggleCard={toggleCard}/>
        </div>

        {
            showCard ? 
                <EditHourCard 
                    day={props.day} 
                    handleOnCardSave={props.handleOnCardSave} 
                    closeCard={closeCard}
                /> : null
        }
        
</>
}