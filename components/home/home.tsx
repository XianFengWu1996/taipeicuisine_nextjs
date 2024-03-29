import { Button, Typography } from "@mui/material"
import { styled } from "@mui/system"
import Image from "next/image"
import { useRouter } from "next/router"
import BgImage from '../../assets/images/dumpling_background.jpg'
import Logo from '../../assets/images/whitelogo.png'

const HomeSection = styled('div')(({theme}) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(${BgImage.src})`,
    backgroundRepeat: 'no-repeat',  
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    padding: '2% 10%',
    [theme.breakpoints.down('md')]: {
        padding: '2% 7%',
    }
}))

const HomeTitle = styled(Typography)(({ theme }) => ({
    color: '#fff',
    paddingBottom: '20px',
    fontSize: '60px', 
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
        fontSize: '40px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '25px',
    },
}))

const ButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    minWidth: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column', 
        alignItems: 'start',     
    },
}))

export const HomePage = () => {
    const router = useRouter();
    return <HomeSection>
        <Image src={Logo.src} alt="taipei logo" height={120} width={140} />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '70vh'}}>
            <HomeTitle>Providing some of the most authenic Taiwanese and Chinese style food</HomeTitle>
            <ButtonContainer>
                <Button variant="contained" size="large" style={{ 
                    marginRight: '35px', 
                    backgroundColor: '#e74c3c', 
                    marginBottom: '15px',
                    height: '40px'
                }}
                onClick={() => {
                    router.push('/order')
                }}
                >Order</Button>
                <Button 
                    variant="outlined" 
                    href={'https://firebasestorage.googleapis.com/v0/b/foodorder-43af7.appspot.com/o/Menu.pdf?alt=media&token=6689dd02-5fe5-46b4-a219-3bb7fb2a7ec7'}
                    size="large" 
                    style={{
                        border: '1px solid #e74c3c',
                        color: '#e74c3c',                    
                        height: '40px'
                    }}
                >Explore Menu</Button>
            </ButtonContainer>
        </div>

    </HomeSection>
}