import { Button, IconButton, TextField } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { motion, Variants } from "framer-motion";
import { isEmpty } from "lodash";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
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
    const { comments } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(comments)

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    const handleCommentOnComplete = () => {
        dispatch(setComments(comment));
        setOpen(false); 

        if(isEmpty(comment)){
            snackbar.warning('Special instruction removed')
            return
        } 

        if(isEmpty(comment)) {
            snackbar.success('Special instruction added')
            return;
        } 
    
        snackbar.info('Special instruction updated')
    }

    const handleRemoveComments = () => {
        setOpen(false)
        setComment('')
        dispatch(setComments(''));
        snackbar.info('Comment removed')
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
                sx={{ width: '90%', mb: 1}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5}}>
                <Button 
                    variant='contained' 
                    sx={{backgroundColor: blue[300],  px: 4, mr: 1.5}}
                    onClick={handleCommentOnComplete}
                >Proceed</Button>

                {
                    !isEmpty(comments) && <IconButton sx={{ color: red[400]}} onClick={handleRemoveComments}>
                        <FaTimes />
                    </IconButton>
                }
            </Box>

            </motion.div>
    </>
}