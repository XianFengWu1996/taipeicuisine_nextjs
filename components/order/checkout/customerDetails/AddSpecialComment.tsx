import { Button, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion, Variants } from "framer-motion";
import { isEmpty } from "lodash";
import { useState } from "react";
import { setComments } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

export const AddSpecialComment = () => {
    const [open, setOpen] = useState(false);

    const { comments } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const variant: Variants | undefined = {
        open: {
            display: 'block',
            opacity: 1,
            translateY: 0,
        }, 
        close: {
            opacity: 0,
            translateY: -50,
            transitionEnd: {
                display: 'none'
            }
        }
    }

    return <>
        <Button sx={{ color: blue[500], display: 'block'}} onClick={handleOpenToggle}>{!isEmpty(comments) ? 'Edit' : 'Add'} Special Instructions</Button>

        <motion.div
            animate={ open ? 'open' : 'close' }
            initial={'close'}
            variants={variant}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
            
        >
            <TextField
                placeholder="Leave some notes for the restaurant, ex. delivery instruction"
                multiline
                rows={3}
                maxRows={4}
                sx={{ width: '90%', marginBottom: '20px'}}
                onBlur={(e) => {
                    dispatch(setComments(e.target.value));
                    setOpen(false); 
                }}
            />
            </motion.div>
    </>
}