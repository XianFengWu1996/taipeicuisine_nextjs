import { Card, CardContent, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Box } from "@mui/system"
import { isEmpty, range } from "lodash"
import React, { useState } from "react"
import { GiAlarmClock } from "react-icons/gi"
import { IoIosClose } from "react-icons/io"
import { setScheduleTime } from "../../../../store/slice/cartSlice"
import { useAppDispatch } from "../../../../store/store"

export const PickupTime = () => {
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');

    const date = new Date(); // initialize a date object
    let startTime = 660;
    let endTime = 1300;
    let startHour =Math.floor(startTime / 60)
    let endHour =  Math.floor(endTime / 60)
  

    const [allow_hours, setAllowHours] = useState<number[]>([]);
    const [allow_mintes, setAllowMinutes] = useState<number[]>([]);

    const dispatch = useAppDispatch()

    const handleHourOnOpen = (e: React.SyntheticEvent) => {
        setHour('');
        setMinute('');

        // let temp = range(startHour, endHour + 1);
        let temp = range(0, 24);

        let allow_hours = temp.filter((hour) => hour >= date.getHours())

        setAllowHours(allow_hours)
    }


    const handleHourOnChange = (event: SelectChangeEvent) => {
        setHour(event.target.value as string);
    };

    const handleMinuteOnOpen = (e: React.SyntheticEvent) => {
        let generate_minute_by_5 = range(0, 60, 5); // generate a array with minutes increment by 5 

        // if(hour.toString() === date.getHours().toString()){
        //     let temp = generate_minute_by_5.filter((min) => min >= date.getMinutes())
        //     console.log(temp)
        //     setAllowMinutes(temp)
        // } else {
        //     setAllowMinutes(generate_minute_by_5);
        // }
        setAllowMinutes(generate_minute_by_5);

    }


    const handleMinuteOnChange = (event: SelectChangeEvent) => {
        setMinute(event.target.value as string);

        dispatch(setScheduleTime(`${hour}:${event.target.value}`))
    };
     
    return <Card sx={{ margin: '10px 0', width: '400px', height: '100px'}}>
    <CardContent>
        <Typography sx={{ color: blue[300], fontWeight: 700}}>
              <GiAlarmClock size={18}/>  Schedule Time :  {hour && minute ? `${hour}:${minute}`: 'ASAP(NOW)'}

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