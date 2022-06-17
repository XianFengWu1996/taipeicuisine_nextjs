import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog,DialogActions,DialogContent,DialogTitle  } from '@mui/material'
import { HourEditDialogContent } from './hourEditDialogContent';
import { AdminState, updateStoreHour } from '../../../../store/slice/adminSlice';
import { cloneDeep, isEqual, toNumber } from 'lodash';
import axios from 'axios';
import snackbar from '../../../snackbar';
import { handleAdminTryCatchError } from '../../../../utils/functions/errors';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { LoadingButton } from '@mui/lab';

interface dialogProps {
    open: boolean,
    handleClose: () => void,
}

export default function HourEditDialog({ open, handleClose }:dialogProps) {
  const admin:AdminState = useAppSelector(state => state.admin);
  const [hours, setHours] = React.useState<IHours[]>(cloneDeep(admin.store_info.hours))
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleCloseForDayOfWeek = (dayOfWeek:string, isOpen:boolean) => {
    const index = hours.findIndex((day) => day.day_of_week === dayOfWeek)
    let tempHours:IHours[] = [...hours];
    tempHours[index].open_for_business =  isOpen;
    setHours((_) => tempHours);
  }

  const handleOnCardSave = (dayOfWeek: string, openHr:string, openMin:string, closeHr:string, closeMin:string, ) => {
    let openHour = toNumber(openHr) * 60 + toNumber(openMin)
    let closeHour = toNumber(closeHr) * 60 + toNumber(closeMin)
  
    const index = hours.findIndex((day) => day.day_of_week === dayOfWeek)
    let tempHours:IHours[] = [...hours];
    tempHours[index].open_hour = openHour;
    tempHours[index].close_hour = closeHour;
    setHours((_) => tempHours);
  }

  const handleOnSave = async () => {
    let noChangeMade = isEqual(admin.store_info.hours, hours);

    if(noChangeMade){
      handleClose();
      return;
    }

    setLoading(true);

    if(!loading){
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_CF_URL}/store/hours`, { hours })
        snackbar.success('Hours has been updated')
        dispatch(updateStoreHour(hours));
        handleClose();
      } catch (error) {
        handleAdminTryCatchError(error, 'Failed to update hours');
      }  
    }

    setLoading(false);
  }

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
                hours.map((day, index) => {
                    return  <HourEditDialogContent 
                      day={day} 
                      handleCloseForDayOfWeek={handleCloseForDayOfWeek}
                      handleOnCardSave={handleOnCardSave}
                      key={`${day.day_of_week}${index}`}
                      />
                })
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton loading={loading} variant="contained" onClick={handleOnSave}>Save</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}







