import { Button, Grid, Typography } from "@mui/material"
import Image from "next/image"
import BgImage from '../../assets/images/dumpling_background.jpg'
import Logo from '../../assets/images/whitelogo.png'

export const HomePage = () => {
    return <section style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${BgImage.src})`,
        backgroundRepeat: 'no-repeat',  
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
    }}>
        <div style={{ padding: '2% 10%'}}>
            <Image src={Logo.src} alt="taipei logo" height={120} width={140} />
        </div>

        <div style={{ maxWidth: '1000px', position:'absolute', top: '40%', left: '15%'}}>
            <Typography
                variant="h3"
                style={{
                    color: '#fff',
                    paddingBottom: '20px'
                }}
            >Providing some of the most authenic Taiwanese and Chinese style food</Typography>
            <Button variant="contained" size="large" style={{ marginRight: '35px', backgroundColor: '#e74c3c'}}>Order</Button>
            <Button variant="outlined" size="large" style={{
                border: '1px solid #e74c3c',
                color: '#e74c3c'
            }}>Explore Menu</Button>
        </div>

    </section>
}