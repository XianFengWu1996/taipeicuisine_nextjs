import { Typography } from "@mui/material"

export const Footer = () => {
    const date = new Date()
    return <footer style={{
        minHeight: '30vh',
        backgroundColor: '#333',
        color: '#888',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Typography>Contact us</Typography>
        <Typography>617-328-4188</Typography>
        <Typography>617-328-4288</Typography>
        <Typography>Copyright © {date.getFullYear()} by Taipei Cuisine. All rights reserved.</Typography>
    </footer>
}