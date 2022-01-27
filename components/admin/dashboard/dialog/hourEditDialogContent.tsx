import React from "react";
import { CheckBoxWithDay } from "./checkboxWithDay";
import { EditHourCard } from "./editHourCard";
import { HourDisplayBox } from "./hourDisplayBox";

export const HourEditDialogContent = ({day, closeForDayOfWeek} : {day: hours, closeForDayOfWeek: (arg1: string, arg2: boolean) => void}) => {
    const [showCard, setShowCard] = React.useState(false);

    const toggleCard = () => {
        setShowCard(!showCard);
    }

    const closeCard = () => {
        setShowCard(false);
    }
    return  <>
        <div style={{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'space-between',
        }}>
            <CheckBoxWithDay day={day} onChanged={(_) => {
                closeForDayOfWeek(day.day_of_week, _.target.checked);
            }}/>
            <HourDisplayBox  day={day} toggleCard={toggleCard}/>
        </div>

        {
            showCard ? <EditHourCard day={day} closeCard={closeCard} /> : <></>
        }
        
</>
}