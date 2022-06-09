import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { updateAptBusiness } from "../../../../store/slice/customerSlice";
import { setShowAddressCard } from "../../../../store/slice/settingSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { handleCatchError } from "../../../../utils/errors/custom";
import { fbAuth } from "../../../../utils/functions/auth";
import snackbar from "../../../snackbar";

export const AptAndBusiness = () => {
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [apt, setApt] = useState<string>('');
    const [business, setBusiness] = useState<string>('');

    const { address } = useAppSelector(state => state.customer)
    const dispatch = useAppDispatch();

    const handleAddAptAndBusiness = async () => {
        setLoading(true);

        try {
            if(isEmpty(apt) && isEmpty(business)){
                throw new Error('Please include apt, business, or both to proceed')
            }

            if(!loading){
                await axios({
                    method: 'PATCH',
                    url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/address/apt_business`,
                    data: {
                        apt, business, address
                    },
                    headers: {
                        'Authorization': `Bearer ${await fbAuth.currentUser?.getIdToken()}`
                    }
                })
                
                dispatch(setShowAddressCard(false));
                dispatch(updateAptBusiness({ apt, business }));
                snackbar.success('Apt or Business has been updated')
            }
            } catch (error) {
                handleCatchError((error as Error), 'Failed to add apt or business')
            } finally {
                setLoading(false)
            }
        
    }

    return <Box sx={{ my: 1}}>
        <Button onClick={() => setShow(!show)}>Add Apt / Business</Button>

        {
            show && <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%'}}>
            <TextField 
                label={'Apt'}
                size='small'
                sx={{ mb: 1}}
                value={apt}
                onChange={(e) =>  setApt(e.target.value) }
            />

            <TextField 
                label={'Business'}
                size='small'
                sx={{ mb: 1}}
                value={business}
                onChange={(e) =>  setBusiness(e.target.value) }
            />

            <Button variant="outlined" onClick={handleAddAptAndBusiness}>{loading ? <BeatLoader size={5} color={'red'} /> : 'Add'}</Button>

        </Box>
        }
    </Box>
}