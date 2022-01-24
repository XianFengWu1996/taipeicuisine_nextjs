import { Paper, Typography, SxProps } from '@mui/material';
import ResponsiveAppBar from '../../components/appbar';
import { Box, Theme } from '@mui/system';
import { DayOfWeekTile} from '../../components/admin/dashboard/dayHourTile';
import { useState } from 'react';
import { useStore } from '../../context/storeContext'
import { CSSProperties } from '@mui/styled-engine';
import HourEditDialog from '../../components/admin/dashboard/hourEditDialog';

export const convertMinuteToDate = (min: number) => {
    // 9:10 = 550 
    let hour, minute;

    minute = min % 60;
    hour = (min - minute) / 60;

    return {
        hour,
        minute,
        hourToString: hour < 10 ? `0${hour}` : hour.toString(),
        minuteToString: minute < 10 ? `0${minute}` : minute.toString(),
    }
}

export default function Dashboard ({ storeData} : {storeData: store}){
    const boxStyle: SxProps<Theme> | undefined = {
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
        m: 1,
        width: 500,
        height: 500,
        }
    }
    
    const titleStyle: CSSProperties | undefined = {
        margin: '20px 0px 20px 20px',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
    
    const { hours } = useStore();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    return <div>
        <ResponsiveAppBar />
        <Box sx={boxStyle}>
            <Paper>
                <Typography style={titleStyle}>Hours</Typography>
                {
                    hours.map((day, index) => {
                        return <DayOfWeekTile
                            key={`${index}${day.day_of_week}`} 
                            day={day}
                            index={index}
                            handleDialogOpen={handleClickOpen}
                        />
                    })
                }
            </Paper>
        </Box>

        <HourEditDialog
            open={openDialog}
            handleClose={handleClose}
        />
    </div>
}

// export const getServerSideProps:GetServerSideProps = async(context: GetServerSidePropsContext) => {
//     try{
        
//         if(!context.req.headers.cookie?.includes('ID_TOKEN')){
//             throw new Error('Not Authenticated')
//         }

//         let response = await axios({
//             method: 'GET',
//             url: 'http://localhost:5001/foodorder-43af7/us-central1/admin/store',
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json',
//                 Cookie: context.req.headers.cookie!,
//             }
//         })

//         if(response.status !== 200 && !response.data.storeData){
//             throw new Error('Failed to get store data')
//         }

//         return {
//             props: {
//                 storeData: response.data.storeData
//             }
//         }      
//     } catch (error) {
//         console.log(error);
//     }

//     return {
//         props: {}
//     } 
    
// }