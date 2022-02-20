import { Typography } from "@mui/material"

export const StoreDetails = () => {
    return <section style={{
        height: '100vh',
        width: '100vw'
    }}>
        <Typography 
        variant="h3"
        style={{
            letterSpacing: '1px',
            fontFamily: 'Arial',
            textTransform: 'uppercase',
            fontWeight:200,
            color: '#555555',
            textAlign: 'center',
        }}
        sx={{
            '&::after': {
                display: 'block',
                height: '2px',
                content: '" "',
                background: '#e74c3c',
                width: '150px',
                margin: '0 auto',
                marginTop: '20px',
            }
        }}
        >
            Best Chinese Food In - Quincy
        </Typography>

    </section>
}