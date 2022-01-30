import { Paper, Typography, SxProps, Button, Grid, CardContent, Card } from '@mui/material';
import ResponsiveAppBar from '../../components/appbar';
import { Box, Theme } from '@mui/system';
import { DayOfWeekTile} from '../../components/admin/dashboard/dayHourTile';
import { useEffect, useState } from 'react';
import { useStore } from '../../context/storeContext'
import { CSSProperties } from '@mui/styled-engine';
import HourEditDialog from '../../components/admin/dashboard/dialog/hourEditDialog';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';

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

export default function Dashboard ({ storeData} : {storeData: IStore}){
    const boxStyle: SxProps<Theme> | undefined = {
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
        m: 1,
        width: 500,
        height: 500,
        margin: '50px 20px'
        }
    }
    
    const titleStyle: CSSProperties | undefined = {
        margin: '20px 0px ',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
    
    const { hours, updateRequired, updateHourToDB, getStoreData, serverOn, toggleServerStatus } = useStore();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        getStoreData(storeData);
    }, [])

    return <div>
        <ResponsiveAppBar />
        <Grid container spacing={4} sx={{ my: 3, mx: 3}} alignItems="center" >
            <Grid item xs={12} md={8}>
                    <div>{storeData.name}</div>
                    <div>{storeData.address.street}, {storeData.address.city}, {storeData.address.state} {storeData.address.zipcode}</div>
                    <div>Primary Phone Number: {storeData.primary_phone_number}</div>
                    <div>Secondary Phone Number: {storeData.sub_phone_number[0]}</div>
            </Grid>
            <Grid item xs={12} md={4} >
                    <Button
                        onClick={toggleServerStatus}
                        sx={{ 
                            backgroundColor: !serverOn ? 'green' : 'red',
                            color: '#fff',
                        }}
                        >{!serverOn ? 'Accept Order' : 'Pause Order'}
                    </Button>
            </Grid>
        </Grid>
       
        <Box sx={boxStyle}>
            <Paper>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px', alignItems: 'center'}}>
                    <Typography sx={titleStyle}>Hours</Typography>
                    <Button variant='contained' disabled={!updateRequired} onClick={updateHourToDB}>Save</Button>
                </div>
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

export const getServerSideProps:GetServerSideProps = async(context: GetServerSidePropsContext) => {
    try{        
        if(!context.req.headers.cookie?.includes('ID_TOKEN')){
            throw new Error('Not Authenticated')
        }

        let response = await axios({
            method: 'GET',
            url: 'http://localhost:5001/foodorder-43af7/us-central1/admin/store',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Cookie: context.req.headers.cookie!,
            },
            withCredentials: true,
        })

        if(response.status !== 200 && !response.data.storeData){
            throw new Error('Failed to get store data')
        }

        return {
            props: {
                storeData: response.data.storeData
            }
        }      
    } catch (error) {
        console.log(error);
    }

    return {
        props: {}
    } 
    
}