import { Box, ButtonBase, Typography } from "@mui/material";
import { convertMinuteToDate } from "../../../../utils/functions/time";

export const HourDisplayBox = ({day, toggleCard} : {day: IHours, toggleCard: () => void}) => {
    const openTime = convertMinuteToDate(day.open_hour);
    const closeTime = convertMinuteToDate(day.close_hour);

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
                    {openTime.hourToString}:{openTime.minuteToString}
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
                    {closeTime.hourToString}:{closeTime.minuteToString}
                </Typography>
            </ButtonBase>
            </Box>
    </>
}