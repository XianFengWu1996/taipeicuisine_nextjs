import { Paper, Typography, SxProps, Button, Grid } from '@mui/material';
import ResponsiveAppBar from '../../../components/appbar';
import { Box, Theme } from '@mui/system';
import { DayOfWeekTile} from '../../../components/admin/dashboard/dayHourTile';
import { useEffect, useState } from 'react';
import { CSSProperties } from '@mui/styled-engine';
import HourEditDialog from '../../../components/admin/dashboard/dialog/hourEditDialog';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import snackbar from '../../../components/snackbar';
import Router from 'next/router';
import { signOut} from 'firebase/auth'
import { fbAuth } from '../../_app';
import {  AdminState, getInitialStoreInfo, toggleServer } from '../../../store/slice/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { isEmpty } from 'lodash'
import { handleAdminTryCatchError } from '../../../utils/functions/errors';


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

interface IDashboardProps {
    storeData?: IStore,
    error: {
        msg: string
    }
}

export default function Dashboard ({ storeData, error }: IDashboardProps){
    const dispatch = useAppDispatch()
    const admin:AdminState = useAppSelector(state => state.admin);
    const { server_is_on, name, address, primary_phone_number, sub_phone_number, hours } = admin.store_info;
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleToggleServer = () => {
        axios.post('http://localhost:5001/foodorder-43af7/us-central1/store/status', {
            server_is_on: !server_is_on
        }).then((response) => {
            if(response.status === 200){
                dispatch(toggleServer(!server_is_on))

                snackbar.success('Server status has been update')
            }
        }).catch((error) => {
            handleAdminTryCatchError(error, 'Failed to update server status');
        });
    }

    useEffect(() => {
        if(error){
            signOut(fbAuth);
            Router.push('/admin/login');
            snackbar.error(error.msg);
            return;
        }

        if(storeData){
            dispatch(getInitialStoreInfo(storeData));
        }
    }, [])

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
        margin: '20px 30px ',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }


    return <div>
        <ResponsiveAppBar />
        {
            !isEmpty(admin.store_info) ? <>
            <Grid container spacing={4} sx={{ my: 3, mx: 3}} alignItems="center" >
                <Grid item xs={12} md={8}>
                        <div>{name}</div>
                        <div>{address.street}, {address.city}, {address.state} {address.zipcode}</div>
                        <div>Primary Phone Number: {primary_phone_number}</div>
                        <div>Secondary Phone Number: {sub_phone_number[0]}</div>
                </Grid>
                <Grid item xs={12} md={4} >
                        <Button
                            onClick={handleToggleServer}
                            sx={{ 
                                backgroundColor: !server_is_on ? 'green' : 'red',
                                color: '#fff',
                            }}
                            >{!server_is_on ? 'Accept Order' : 'Pause Order'}
                        </Button>
                </Grid>
            </Grid>
           
            <Box sx={boxStyle}>
                <Paper>
                    <Typography sx={titleStyle}>Store Hours</Typography>

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
            </> : <div></div>
        }
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

        if(response.status !== 200 && !response.data.storeData) throw new Error('Failed to get store data') 

        return {
            props: {
                storeData: response.data.storeData, 
            }
        }      
    } catch (error) {
        return {
            props: {
                error: {
                    msg: (error as Error).message ?? 'Authentication fail'
                }
            }
        }
    }
}