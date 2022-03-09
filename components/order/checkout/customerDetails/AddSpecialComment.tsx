import { Button, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion, Variants } from "framer-motion";
import { isEmpty } from "lodash";
import { FocusEvent, useState } from "react";
import { setComments } from "../../../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import snackbar from "../../../snackbar";

export const sliding_variant: Variants | undefined = {
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

export const AddSpecialComment = () => {
    const [open, setOpen] = useState(false);

    const { comments } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const handleCommentOnBlur = (e: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        dispatch(setComments(e.target.value));
        setOpen(false); 

        if(isEmpty(e.target.value)){
            snackbar.warning('Special instruction removed')
            return
        } 

        if(isEmpty(comments)) {
            snackbar.success('Special instruction added')
            return;
        } 
    
        snackbar.info('Special instruction updated')
    }

    return <>
        <Button sx={{ color: blue[500], display: 'block'}} onClick={handleOpenToggle}>{!isEmpty(comments) ? 'Edit' : 'Add'} Special Instructions</Button>

        <motion.div
            animate={ open ? 'open' : 'close' }
            initial={'close'}
            variants={sliding_variant}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
        >
            <TextField
                placeholder="Leave some notes for the restaurant, ex. delivery instruction"
                multiline
                rows={3}
                sx={{ width: '90%', marginBottom: '20px'}}
                onBlur={handleCommentOnBlur}
            />
            </motion.div>
    </>
}