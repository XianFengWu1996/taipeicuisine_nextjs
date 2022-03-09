import { Button, Icon, styled, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion";
import { FocusEvent, useState } from "react";
import { setPointRedemption } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import snackbar from "../../../snackbar";
import { sliding_variant } from "./AddSpecialComment";
import Tooltip from '@mui/material/Tooltip'

import { BsQuestionCircle } from 'react-icons/bs'


const DiscountTitle = styled('div')(() => ({
    display: 'flex', 
    alignItems: 'center',
    marginBottom: '5px', 
    lineHeight: 0
})) 

export const ApplyDiscount = () => {
    const [open, setOpen] = useState(false);

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const dispatch = useAppDispatch();
    const { original_subtoal } = useAppSelector(state => state.cart)
    const { reward } = useAppSelector(state => state.customer)

    const handleDiscountOnBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element> ) => {
        let point = Number(e.target.value);

        if(point > reward.points){
            snackbar.error(`Not enough points (${reward.points} pts available)`)
            return;
        } 

        dispatch(setPointRedemption(point));
        setOpen(false); 
        snackbar.success('Point applied')
    }

    return <>
        <Button sx={{ color: blue[500],marginTop: '10px'}} onClick={handleOpenToggle}>Apply Discount</Button>

        <motion.div
            animate={ open ? 'open' : 'close' }
            initial={'close'}
            variants={sliding_variant}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
        >
            <DiscountTitle>
                <Typography sx={{ marginRight: '5px'}}>POINT REDEMPTION</Typography>
                
                <Tooltip title={`Max Per Order: 50% of the Subtotal (${Math.floor((original_subtoal / 2) * 100)}) `} placement="top-start" arrow>
                    <Icon sx={{ fontSize: '18px'}}>
                        <BsQuestionCircle />
                    </Icon>
                </Tooltip>
            </DiscountTitle>

            <TextField
                autoComplete='off'
                type={'number'}
                placeholder={`Points Available: ${reward.points}`}
                sx={{ width: '300px', marginBottom: '20px'}}
                onBlur={handleDiscountOnBlur}
            />
            </motion.div>
    </>
}