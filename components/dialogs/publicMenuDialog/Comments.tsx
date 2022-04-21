import { TextField } from "@mui/material";
import { FocusEvent } from "react";

interface ICommentsProp {
    handleOnBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) =>  void 
}

export const Comments  = (_:ICommentsProp) => {
    return <>
        <TextField 
            multiline
            minRows={2} 
            sx={{ m: 0.5, width: '100%'}}
            placeholder="Leave comment specific to this dish, such as spicy level, allergies, etc"
            onBlur={_.handleOnBlur}
        />
    </>
}