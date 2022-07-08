import { Chip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { isEmpty } from "lodash"
import { BiCommentDetail } from "react-icons/bi"


interface IOrderSpecialInstruction {
    comments: string,
}

export const OrderSpecialInstruction = ({ comments } :IOrderSpecialInstruction) => {
    return <>
        {
            !isEmpty(comments) &&  <Box sx={{ my: 1.5}}>
             <Chip
                 color='error' 
                 icon={<BiCommentDetail size={18} style={{ marginLeft: '10px'}}/>} 
                 label={<Typography>Special Instruction: {comments}</Typography>} />
            </Box>
        }
    </>
}