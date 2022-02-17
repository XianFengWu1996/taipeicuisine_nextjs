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
import {  AdminState, getInitialStoreInfo, toggleServer } from '../../../store/slice/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { isEmpty } from 'lodash'
import { handleAdminNotAuthRedirect, handleAdminTryCatchError, serverSideCheckAuth } from '../../../utils/functions/errors';
import { isNotAuthError } from '../../../components/error/custom';
import { LoadingButton } from '@mui/lab';
import { hasExpired } from '../../../utils/functions/time';




interface IDashboardProps {
    storeData?: IStore,
    error: {
        msg: string,
        code: number,
    }
}

export default function Dashboard ({ storeData, error }: IDashboardProps){
    const dispatch = useAppDispatch()
    const admin:AdminState = useAppSelector(state => state.admin);
    const { server_is_on, name, address, primary_phone_number, sub_phone_number, hours } = admin.store_info;
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleToggleServer = async  () => {
        setLoading(true);
        if(!loading){
            try {
                await axios.post('http://localhost:5001/foodorder-43af7/us-central1/store/status', {
                    server_is_on: !server_is_on
                })
                dispatch(toggleServer(!server_is_on))
                snackbar.success('Server status has been update')
            } catch (error) {
                handleAdminTryCatchError(error, 'Failed to update server status');
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        handleAdminNotAuthRedirect(error);

        console.log(storeData);

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
                        <LoadingButton
                            loading={loading}
                            onClick={handleToggleServer}
                            sx={{ 
                                backgroundColor: !server_is_on ? 'green' : 'red',
                                color: '#fff',
                            }}
                            >{!server_is_on ? 'Accept Order' : 'Pause Order'}
                        </LoadingButton>
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

export const getServerSideProps:GetServerSideProps = async(ctx: GetServerSidePropsContext) => {
    try{        

        // check if there is expiration
        if(ctx.query.expiration){
            // if not expired
            if(!hasExpired(Number(ctx.query.expiration))){
                return { props: { }};
            }
        }

        let cookies: string | undefined = ctx.req.headers.cookie;
        serverSideCheckAuth(cookies);

        let response = await axios.get('http://localhost:5001/foodorder-43af7/us-central1/admin/store', {
            headers: {  Cookie: cookies! }
        })     

        return {
            props: { storeData: response.data.storeData }
        }      
    } catch (error) {
        return {
            props: {
                error: {
                    msg: (error as Error).message ?? 'Authentication fail',
                    code: isNotAuthError(error as Error) ? 401 : 400
                }
            }
        }
    }
}