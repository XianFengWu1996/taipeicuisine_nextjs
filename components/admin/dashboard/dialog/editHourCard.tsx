import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { convertMinuteToDate } from "../../../../pages/admin/dashboard";

const selectStyle:React.CSSProperties | undefined = {
    width: 70,
    margin:'20px 10px 0 0'
}

const cardStyle:React.CSSProperties | undefined  = { 
    display: 'flex', 
    marginTop: 10, 
    marginBottom: 50, 
    justifyContent: 'center',
}

const generateHourAndMinute = () => {
    const stringHrArr:string[] = [];
    const stringMinArr:string[] = [];
    const hours = Array.from(Array(24).keys());
    const minutes = Array.from(Array(60).keys());
    hours.forEach((hr) => {
        stringHrArr.push(hr < 10 ? `0${hr}` : `${hr}`);
    })

    minutes.forEach((min) => {
        stringMinArr.push(min < 10 ? `0${min}` : `${min}`);
    })

    return {
        hours: stringHrArr,
        minutes: stringMinArr
    }
}

interface IEditHourCardProps {
    day: IHours,
    handleOnCardSave: (
        dayOfWeek: string,
        openHr: string, 
        openMin: string, 
        closeHr: string, 
        closeMin: string, 
    ) => void,
    closeCard: () => void 
}

export const EditHourCard = ({ day, handleOnCardSave, closeCard }:IEditHourCardProps) => {

    const [openHour, setOpenHour] = React.useState({ 
        hr: convertMinuteToDate(day.open_hour).hourToString,
        min: convertMinuteToDate(day.open_hour).minuteToString,
    });

    const [closeHour, setCloseHour] = React.useState({
        hr: convertMinuteToDate(day.close_hour).hourToString,
        min: convertMinuteToDate(day.close_hour).minuteToString,
    });
  
    const editHourHour = (e: SelectChangeEvent<string>, _: React.ReactNode) => {
        setOpenHour({ 
            hr: e.target.name === 'hour' ? e.target.value : openHour.hr,
            min: e.target.name === 'minute' ? e.target.value : openHour.min
        })        
    }   

    const editCloseHour = (e: SelectChangeEvent<string>, _: React.ReactNode) => {
        setCloseHour({ 
            hr: e.target.name === 'hour' ? e.target.value : closeHour.hr,
            min: e.target.name === 'minute' ? e.target.value : closeHour.min
        }) 
    }

    const time = generateHourAndMinute();

    return  <>
            <div style={cardStyle}>    
                    <EditHourCardItem 
                        title='Open Hour' 
                        time={time}
                        currentTime={openHour}
                        handleTimeChange={editHourHour}
                    />
                    <EditHourCardItem 
                        title='Close Hour' 
                        time={time}
                        currentTime={closeHour} 
                        handleTimeChange={editCloseHour}
                    />
                    <Button 
                        variant='contained' 
                        sx={{ backgroundColor: 'black', alignSelf: 'end'}}
                        onClick={() => {
                            handleOnCardSave(day.day_of_week, openHour.hr,openHour.min, closeHour.hr, closeHour.min);
                            closeCard();
                        }}
                    >Save</Button>
                </div>
    </> 
    
}


interface IEditHourCardItemProps {
    title: string, 
    time: {
        hours: string[],
        minutes: string[],
    }
    currentTime: {
        hr: string, 
        min:string
    },
    handleTimeChange:( _: SelectChangeEvent<string>, child: React.ReactNode) => void
}

const EditHourCardItem = ( props : IEditHourCardItemProps) => {
    return <Box sx={{
        display: 'block', height: 50, marginRight: 3
    }}>
       <Typography>{props.title}</Typography>
       <SelectBox 
         type="hour"
         title={props.title}
         value={props.currentTime.hr}
         data={props.time.hours}
         handleOnChange={props.handleTimeChange}
       />

        <SelectBox 
            type="minute"
            title={props.title}
            value={props.currentTime.min}
            data={props.time.minutes}
            handleOnChange={props.handleTimeChange}
        />           
    </Box>
}

interface ISelectBox {
    type: string,
    title: string,
    handleOnChange: (_:SelectChangeEvent<string>, child: React.ReactNode) => void,
    value: string, 
    data: string[],
}

const SelectBox = (props : ISelectBox) => {
    return <Select
            style={selectStyle}
            name={props.type}
            labelId={`dropdown select for ${props.type}`}
            id={`${props.type}_dropdown`}
            value={props.value}
            label={props.type.toUpperCase()}
            onChange={props.handleOnChange}>
            {
                props.data.map((v) => {
                    return <MenuItem value={v} key={v}>{v}</MenuItem>
                }) 
             }
        </Select>
}