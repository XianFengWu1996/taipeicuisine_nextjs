import { TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"



export default function EditMenuItem () {
    const router = useRouter()
    const { id } = router.query

    return <>
        
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
            >
            <Typography>{}</Typography>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
    </>
}