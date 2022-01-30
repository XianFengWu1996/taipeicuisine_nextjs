import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { convertMinuteToDate } from '../../../pages/admin/dashboard';

// ==========================================
// THE COMPONENTS WILL TAKING IN AN HOUR OBJECT AND THE CURRENT INDEX
//  - FORMAT THE NUMBER OF OPEN AND CLOSE HOUR (550) TO HOURS AND MINUTES (9:10)
//  - DYNAMIC DISPLAY THE HOUR OR 'CLOSE' BASE ON THE DATA 
// ==========================================

interface TileProps {
    day: hours,
    index: number,
    handleDialogOpen: () => void
}

export const DayOfWeekTile = (props: TileProps) => {
    const { index, day, handleDialogOpen } = props;

    const tileStyle = {
        backgroundColor: index % 2 === 0 ? '#eaf0f7' : '#fff'
    }
    
    const buttonStyle = {
        display: 'flex',
        alignItems: 'space-between',
        width: '100%'
    }
    
    const timeTextStyle = {
        display:'flex',
        justifyContent: 'end',
        color: day.open_for_business ? 'black' : 'red'
    }

    // DISPLAY THE HOUR OR 'CLOSE' DEPENDING ON THE VARIABLE
    const checkStoreClose = () => {
        if(!day.open_for_business){
            return 'Close'
        } else {
            return `${convertMinuteToDate(day.open_hour).hourToString}:${convertMinuteToDate(day.open_hour).minuteToString}
            - ${convertMinuteToDate(day.close_hour).hourToString}:${convertMinuteToDate(day.close_hour).minuteToString}`
        }
    }
    return <>
        <ListItem style={tileStyle}> 
            <ListItemButton  style={buttonStyle} onClick={handleDialogOpen}>
                    <ListItemText primary={day.day_of_week} />

                    <ListItemText 
                        style={timeTextStyle}
                        primary={checkStoreClose()}
                    />
            </ListItemButton>
        </ListItem>
    </>
}

