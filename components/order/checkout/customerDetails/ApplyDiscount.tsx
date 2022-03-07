import { Button, Icon, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useState } from "react";
import { setPointRedemption } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import snackbar from "../../../snackbar";
import { sliding_variant } from "./AddSpecialComment";
import Tooltip from '@mui/material/Tooltip'

import { BsQuestionCircle } from 'react-icons/bs'

export const ApplyDiscount = () => {
    const [open, setOpen] = useState(false);

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const dispatch = useAppDispatch();
    const { temp_point, original_subtoal } = useAppSelector(state => state.cart)

    return <>
        <Button sx={{ color: blue[500]}} onClick={handleOpenToggle}>Apply Discount</Button>

        <motion.div
            animate={ open ? 'open' : 'close' }
            initial={'close'}
            variants={sliding_variant}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
            
        >
            <div style={{ display: 'flex', alignItems: 'center',marginBottom: '5px', lineHeight: 0}}>
                <Typography sx={{ marginRight: '5px'}}>POINT REDEMPTION</Typography>
                
                <Tooltip title={`Max Per Order: 50% of the Subtotal (${Math.floor((original_subtoal / 2) * 100)}) `} placement="top-start" arrow>
                    <Icon sx={{ fontSize: '18px'}}>
                        <BsQuestionCircle />
                    </Icon>
                </Tooltip>
            </div>
            <TextField
                autoComplete='off'
                type={'number'}
                placeholder="Points Available: 105"
                sx={{ width: '300px', marginBottom: '20px'}}
                onBlur={(e) => {
                    let point = Number(e.target.value);

                    if(point > temp_point){
                        snackbar.error('Not enough points')
                        return;
                    } 

                    dispatch(setPointRedemption(point));
                    setOpen(false); 
                }}
            />
            </motion.div>
    </>
}