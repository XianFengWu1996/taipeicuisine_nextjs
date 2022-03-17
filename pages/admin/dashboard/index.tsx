import { Paper, Typography, SxProps, Grid } from '@mui/material';
import ResponsiveAppBar from '../../../components/admin/appbar';
import { Box, Theme } from '@mui/system';
import { DayOfWeekTile} from '../../../components/admin/dashboard/dayHourTile';
import { useEffect, useState } from 'react';
import { CSSProperties } from '@mui/styled-engine';
import HourEditDialog from '../../../components/admin/dashboard/dialog/hourEditDialog';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import snackbar from '../../../components/snackbar';
import {  AdminState, getInitialStoreInfo, toggleServer, toggleLoginLoading } from '../../../store/slice/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { isEmpty } from 'lodash'
import { checkTokenInToken, handleAdminNotAuthRedirect, handleAdminTryCatchError } from '../../../utils/functions/errors';
import { isNotAuthError } from '../../../utils/errors/custom';
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
    // redux store
    const dispatch = useAppDispatch()
    const admin:AdminState = useAppSelector(state => state.admin);
    const { server_is_on, name, address, primary_phone_number, sub_phone_number, hours } = admin.store_info;

    // component states
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
                await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/store/status`, {
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
        if(storeData){
            dispatch(getInitialStoreInfo(storeData));
        }

        dispatch(toggleLoginLoading(false))
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
        if(checkTokenInToken(ctx.req.headers.cookie)){
            return checkTokenInToken(ctx.req.headers.cookie)!
        }

        // check if there is expiration
        if(ctx.query.expiration){
            // if not expired
            if(!hasExpired(Number(ctx.query.expiration))){
                return { props: { }};
            }
        }

        let cookies: string | undefined = ctx.req.headers.cookie;

        let response = await axios.get(`${process.env.NEXT_PUBLIC_CF_URL}/admin/store`, {
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