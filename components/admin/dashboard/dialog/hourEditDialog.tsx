import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog,DialogActions,DialogContent,DialogTitle  } from '@mui/material'
import { HourEditDialogContent } from './hourEditDialogContent';
import { AdminState, updateStoreHour } from '../../../../store/slice/adminSlice';
import { cloneDeep, isEqual, toNumber } from 'lodash';
import axios, { AxiosError } from 'axios';
import snackbar from '../../../snackbar';
import { handleAdminAxiosError } from '../../../../utils/functions/errors';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface dialogProps {
    open: boolean,
    handleClose: () => void,
}

export default function HourEditDialog({ open, handleClose }:dialogProps) {
  const admin:AdminState = useAppSelector(state => state.admin);
  const [hours, setHours] = React.useState<IHours[]>(cloneDeep(admin.store_info.hours))
  const dispatch = useAppDispatch();

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

  const handleOnSave = () => {
    let noChangeMade = isEqual(admin.store_info.hours, hours);

    if(noChangeMade){
      handleClose();
      return;
    }

    axios.post('http://localhost:5001/foodorder-43af7/us-central1/store/hours', { hours })
    .then((response) => {
        // if the status is 200, then we update the 
        if(response.status === 200){
            snackbar.success('Hours has been updated')
            dispatch(updateStoreHour(hours));
            handleClose();
        }
    }).catch((error: Error | AxiosError) => {
        handleAdminAxiosError(error, 'Failed to update hours');
    });  

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
          <Button variant="contained" onClick={handleOnSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}







