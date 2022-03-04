import { Button, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useState } from "react";

export const ApplyDiscount = () => {
    const [open, setOpen] = useState(false);

    const handleOpenToggle = () => {
        setOpen(!open);
    }

    // const variant: Variants | undefined = {
    //     open: {
    //         display: 'block',
    //         opacity: 1,
    //         translateY: 0,
    //     }, 
    //     close: {
    //         opacity: 0,
    //         translateY: -50,
    //         transitionEnd: {
    //             display: 'none'
    //         }
    //     }
    // }

    return <>
        <Button sx={{ color: blue[500]}}>Apply Discount</Button>

        <motion.div
            animate={ open ? 'open' : 'close' }
            initial={'close'}
            // variants={variant}
            transition={{ duration: 0.5, ease: 'easeInOut'}}
            
        >
            <TextField
                placeholder="Leave some notes for the restaurant, ex. delivery instruction"
                multiline
                rows={3}
                maxRows={4}
                sx={{ width: '90%', marginBottom: '20px'}}
                onBlur={(e) => {
                    setOpen(false); 
                }}
            />
            </motion.div>
    </>
}