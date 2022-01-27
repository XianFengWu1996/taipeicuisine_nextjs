import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStore } from '../../../../context/storeContext';
import { HourEditDialogContent } from './hourEditDialogContent';

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
                hours.map((day, index) => {
                    return  <HourEditDialogContent 
                      day={day} 
                      closeForDayOfWeek={closeForDayOfWeek}
                      key={`${day.day_of_week}${index}`}
                      />
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







