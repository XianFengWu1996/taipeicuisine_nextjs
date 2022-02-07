import { Dialog } from "@mui/material"

interface IProps{
    open: boolean,
    handleClose: () => void,
}


export const AdminMenuDialog = (props: IProps) => {
    return <Dialog open={props.open} onClose={props.handleClose}>

    </Dialog>
}