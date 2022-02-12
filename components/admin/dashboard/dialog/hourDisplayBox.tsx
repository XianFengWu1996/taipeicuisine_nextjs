import { Box, ButtonBase, Typography } from "@mui/material";
import { convertMinuteToDate } from "../../../../pages/admin/dashboard";

export const HourDisplayBox = ({day, toggleCard} : {day: IHours, toggleCard: () => void}) => {
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