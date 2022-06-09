import { Button, Icon, styled, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useState } from "react";
import { setPointRedemption } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import snackbar from "../../../snackbar";
import { sliding_variant } from "../comment/addSpecialComment";
import Tooltip from '@mui/material/Tooltip'

import { BsQuestionCircle } from 'react-icons/bs'


const DiscountTitle = styled('div')(() => ({
    display: 'flex', 
    alignItems: 'center',
    marginBottom: '5px', 
    lineHeight: 0
})) 

export const ApplyDiscount = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [point, setPoint] = useState<string>('')

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const dispatch = useAppDispatch();
    const { original_subtotal, cart } = useAppSelector(state => state.cart)
    const { reward } = useAppSelector(state => state.customer)

    const handleAddPointRedemption = () => {
        let pt = Number(point);

        if(pt > reward.points){
            return snackbar.error(`Not enough points (${reward.points} pts available)`);
        } 

        if(cart.length < 1){
            return snackbar.error("Cart is empty, try adding something...");
        }

        dispatch(setPointRedemption(pt));
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
                
                <Tooltip title={`Max Per Order: 50% of the Subtotal (${Math.floor((original_subtotal / 2) * 100)}) `} placement="top-start" arrow>
                    <Icon sx={{ fontSize: '18px'}}>
                        <BsQuestionCircle />
                    </Icon>
                </Tooltip>
            </DiscountTitle>

            <TextField
                autoComplete='off'
                type={'number'}
                size={'small'}
                placeholder={`Points Available: ${reward.points}`}
                sx={{ width: '275px', marginBottom: '20px'}}
                onChange={(event) => { setPoint(event.target.value) }}
            />

            <Button 
                variant='contained' 
                sx={{ mx: 1.2, backgroundColor: blue[300], py: 0.9}}
                onClick={handleAddPointRedemption}
            >Redeem</Button>
            </motion.div>
    </>
}