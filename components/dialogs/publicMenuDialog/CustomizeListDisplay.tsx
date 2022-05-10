import { IconButton, Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { AiOutlineCloseCircle } from "react-icons/ai"

interface ICustomizeListDisplayProps {
    list: ICustomizeItem[],
    title: string,
    handleOnDelete: (arg: ICustomizeItem, arg2: ICustomizeItem[], arg3: string) => void
}

export const CustomizeListDisplay = ({list, title, handleOnDelete} : ICustomizeListDisplayProps) => {
    return <>
        {
            !isEmpty(list) && <Typography sx={{ textDecoration: 'underline', mt: 1, textTransform:'capitalize', fontSize: 15, fontWeight: 600}}>Extra {title}</Typography>    
        } 
        {
            !isEmpty(list) && list.map((val) => {
                return <div key={val.id} style={{ display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 500}}> Extra {val.en_name} 加{val.ch_name} +${val.price}</Typography>
                        <IconButton color="error" size="small" onClick={() => {
                            handleOnDelete(val, list, title)
                        }}><AiOutlineCloseCircle /></IconButton>
                </div>
            })
        }
    </>
}
    
