import { Card, CardContent, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { range } from "lodash"
import React, { useState } from "react"
import { GiAlarmClock } from "react-icons/gi"
import { HiQuestionMarkCircle } from "react-icons/hi"
import { IoIosClose } from "react-icons/io"
import { setScheduleTime } from "../../../../store/slice/cartSlice"
import { useAppDispatch } from "../../../../store/store"

export const PickupTime = () => {
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');

    const date = new Date(); // initialize a date object
    let startTime = 660;
    let endTime = 1300;
    let startHour = Math.floor(startTime / 60)
    let endHour =  Math.floor(endTime / 60)
  

    const [allow_hours, setAllowHours] = useState<number[]>([]);
    const [allow_mintes, setAllowMinutes] = useState<number[]>([]);

    const dispatch = useAppDispatch()

    const handleHourOnOpen = (e: React.SyntheticEvent) => {
        setHour('');
        setMinute('');

        let temp = range(startHour, endHour + 1);

        let allow_hours = temp.filter((hour) => hour >= date.getHours())

        setAllowHours(allow_hours)
    }


    const handleHourOnChange = (event: SelectChangeEvent) => {
        setHour(event.target.value as string);
    };

    const handleMinuteOnOpen = (e: React.SyntheticEvent) => {

        let generate_minute_by_5 = []; // generate a array with minutes increment by 5 

        // if the hour selected is the last hour of the operating hour
        // we want to generate the list only up to 30 min which is the last call 
        if(hour.toString() === allow_hours[allow_hours.length - 1].toString()){
            generate_minute_by_5 = range(0, 31, 5); // generate a array with minutes up to 30, with increment by 5 
        } else {
            generate_minute_by_5 = range(0, 60, 5); // generate a array with minutes up to 55, with increment by 5 
        }

        // if it is the current hour
        if(hour.toString() === date.getHours().toString()){
            // only show the minutes that has not passed yet
            let temp = generate_minute_by_5.filter((min) => min >= date.getMinutes())
            
            return setAllowMinutes(temp);
        } else {
            setAllowMinutes(generate_minute_by_5);
        }

    }


    const handleMinuteOnChange = (event: SelectChangeEvent) => {
        setMinute(event.target.value as string);

        dispatch(setScheduleTime(`${hour}:${event.target.value}`))
    };
     
    return <Card sx={{ margin: '10px 0', width: '400px', height: '100px'}}>
    <CardContent>
        <Typography sx={{ color: blue[300], fontWeight: 700, mb: 0.6,display: 'flex', alignItems: 'center'}}>
        <GiAlarmClock size={18} style={{ margin: '0 10px'}}/>
        Schedule Time: {hour && minute ? `${hour}:${minute}`: 'ASAP(NOW)'}

        <Tooltip title="The time indicate when to start preparing the food" arrow>
            <IconButton sx={{ padding: 0}}>
                <HiQuestionMarkCircle style={{ fontSize: 15, marginLeft: '5px'}}/>
            </IconButton>
        </Tooltip>
        </Typography>

       <div style={{ display: 'flex'}}>

       <FormControl sx={{ width: '85px'}} size="small">
            <InputLabel id="demo-simple-select-label">Hour</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hour}
                label="Hours"
                onChange={handleHourOnChange}
                onOpen={handleHourOnOpen}
            >
                {
                    allow_hours.map((hr, index) => {
                        return <MenuItem 
                            value={hr} 
                            key={index}
                        >{hr < 10 ? `0${hr}` : hr}</MenuItem>

                    })
                }
            </Select>
        </FormControl>

        <FormControl sx={{ width: '125px', mx: 1}} size="small">
            <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={minute}
                label="Minutes"
                disabled={hour.length === 0}
                onChange={handleMinuteOnChange}
                onOpen={handleMinuteOnOpen}
            >
                {
                    allow_mintes.map((min, index) => {
                        return <MenuItem 
                            value={min} 
                            key={index}
                        >{min < 10 ? `0${min}` : min}</MenuItem>

                    })
                }
            </Select>
        </FormControl>

        <IconButton
            onClick={() => {
                setHour('')
                setMinute('')
                dispatch(setScheduleTime(''))
            }}
        ><IoIosClose /></IconButton>
        </div>

    </CardContent>
</Card>
}