import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStore } from '../../../context/storeContext';
import { Box, ButtonBase, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { convertMinuteToDate } from '../../../pages/admin/dashboard';

interface dialogProps {
    open: boolean,
    handleClose: () => void,
}

export default function HourEditDialog(props:dialogProps) {
    const { hours, closeForDayOfWeek } = useStore();
    const { open, handleClose } = props;

  return (
    <div>
      <Dialog 
        fullWidth
        maxWidth="sm"
        open={open} 
        onClose={handleClose}
    >
        <DialogTitle>Edit Store Hours</DialogTitle>
        <DialogContent>
            {
                hours.map((day) => {
                    return HourEditDialogContent(day, closeForDayOfWeek);
                })
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const HourEditDialogContent = (day: hours, closeForDayOfWeek: (arg1: string, arg2: boolean) => void) => {
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

const CheckBoxWithDay = ({day, onChanged} :{day: hours, onChanged: (arg0: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <>
    <FormGroup>
        <FormControlLabel control={
        <Checkbox checked={day.open_for_business} onChange={onChanged}/>
        
        } label={day.day_of_week} />
    </FormGroup>
    </>
}

const HourDisplayBox = ({day, toggleCard} : {day: hours, toggleCard: () => void}) => {
    const openHour = convertMinuteToDate(day.open_hour).hourToString;
    const openMinute = convertMinuteToDate(day.open_hour).minuteToString;
    const closeHour = convertMinuteToDate(day.close_hour).hourToString;
    const closeMinute = convertMinuteToDate(day.close_hour).minuteToString;
    return <>
        <Box     
            sx={{
                display: 'flex',
                '& > :not(style)': {
                m: 1,
                width: 130,
                height: 45,
                },
            }}>
            <ButtonBase 
                onClick={toggleCard}
                sx={{
                    border: '1px solid #e6e6e6',
                    borderRadius: 1
                }}
            >
                <Typography>
                    {openHour}:{openMinute}
                </Typography>
            </ButtonBase>    

            <ButtonBase 
                onClick={toggleCard}
                sx={{
                    border: '1px solid #e6e6e6',
                    borderRadius: 1
                }}
            >
                <Typography>
                    {closeHour}:{closeMinute}
                </Typography>
            </ButtonBase>
            </Box>
    </>
}

const EditHourCard = ({ day, closeCard} : {day: hours, closeCard: () => void}) => {
    const { editHours } = useStore();
    const cardStyle:React.CSSProperties | undefined  = { 
        display: 'flex', 
        marginTop: 10, 
        marginBottom: 50, 
        justifyContent: 'center',
    }

    const [openHour, setOpenHour] = React.useState({ 
        hr: convertMinuteToDate(day.open_hour).hourToString,
        min: convertMinuteToDate(day.open_hour).minuteToString,

    });
    const [closeHour, setCloseHour] = React.useState({
        hr: convertMinuteToDate(day.close_hour).hourToString,
        min: convertMinuteToDate(day.close_hour).minuteToString,
    });

    const [needUpdate, setNeedUpdate] = React.useState(false)
    
    const editTime = (type: string, hour: string, minute: string) => {
        if(type === 'Open Hour'){
            setOpenHour({ hr: hour, min: minute});
        } else {
            setCloseHour({ hr: hour, min: minute})
        }
        setNeedUpdate(true);
    }

    // STRING VERSION OF THE HOUR AND MINUTE TO BE DISPLAY IN THE THE CARD ITEM
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

    // SAVE THE NEW EDIT HOUR
    const onSave = () => {
        // TRANSFORM THE STRING VERSION OF HOUR AND STRING TO NUMBER
        // THEN WE WILL WANT TO TRANSFORM THE HOUR AND MINUTE INTO TOTAL NUMBER OF MINUTES
        let tempOpen:number = Number(openHour.hr) * 60 + Number(openHour.min); 
        let tempClose:number = Number(closeHour.hr) * 60 + Number(closeHour.min); 

        if(tempOpen > -1 && tempClose < 1441 ){
            editHours(day.day_of_week, tempOpen, tempClose); 
            setNeedUpdate(false);
            closeCard();
            return;
        } 

        console.log('something went wrong');
    }

    return  <>
            <div style={cardStyle}>    
                    <EditHourCardItem 
                        title='Open Hour' 
                        hours={stringHrArr} 
                        minutes={stringMinArr} 
                        currentTime={openHour}
                        editTime={editTime}
                    />
                    <EditHourCardItem 
                        title='Close Hour' 
                        hours={stringHrArr} 
                        minutes={stringMinArr} 
                        currentTime={closeHour} 
                        editTime={editTime}
                    />
                    <Button 
                        variant='contained' 
                        sx={{ backgroundColor: 'black', alignSelf: 'end'}}
                        disabled={!needUpdate}
                        onClick={onSave}
                    >Save</Button>
                </div>
    </> 
    
}

const EditHourCardItem = (
    { title, hours, minutes, currentTime, editTime} 
    : { title: string, 
        hours: string[],
        minutes: string[], 
        currentTime: { hr: string, min: string}, 
        editTime: (type: string, hour: string, minute: string) => void}
    ) => {
    const selectStyle:React.CSSProperties | undefined = {
        width: 70,
        margin:'20px 10px 0 0'
    }

    return <Box sx={{
        display: 'block', height: 50, marginRight: 3
    }}>
       <Typography>{title}</Typography>
        <Select
            style={selectStyle}
            labelId="dropdown select for hour"
            id="hour_dropdown"
            value={currentTime.hr}
            label="Hour"
            onChange={(e) => { editTime(title, e.target.value, currentTime.min)}}>
            {
                hours.map((hr) => {
                    return <MenuItem value={hr} key={hr}>{hr}</MenuItem>
                }) 
             }
        </Select>

        <Select
            style={selectStyle}
            labelId="dropdown select for minute"
            id="minute_dropdown"
            value={currentTime.min}
            label="Minute"
            onChange={(e) => { editTime(title, currentTime.hr, e.target.value)}}>
            {
                minutes.map((min) => {
                    return <MenuItem value={min} key={min}>{min}</MenuItem>
                }) 
             }
        </Select>
    </Box>
}