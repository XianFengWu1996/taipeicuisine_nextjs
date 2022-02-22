import { Grid } from '@mui/material'
import CustomerBg from '../../assets/images/customer-background.jpeg'
import { SectionTitle } from './section_title'
import { AiOutlineUser } from 'react-icons/ai'
import { styled } from '@mui/system'

const TestimonySection = styled('section')(({ theme }) => ({
    backgroundImage: `linear-gradient(rgb(0 0 0 / 52%), rgb(0 0 0 / 87%)), url(${CustomerBg.src})`,
    backgroundRepeat: 'no-repeat',  
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100vw',
    [theme.breakpoints.down('md')]: {
        padding: '0 50px 50px 50px',
    }
}))

export const CustomerTestimony = () => {
    return <TestimonySection >
        <SectionTitle 
            title='Here is what customers are saying'
            color='#fff'
        />

        <Grid 
            container 
            spacing={6} 
            justifyContent={'center'}
            style={{
                paddingTop: '50px',
                minHeight: '70vh'
            }}>
            <Grid item xs={12} md={3}>
                <TestimonyDetails 
                    contents="Authentic Taiwanese cuisine. I went for the beef noodles which 
                    is a staple in Taiwan and how I gauged the authenticity. Two thumbs
                    up from me and its always a plus if there is a wait and you see locals 
                    in it. Only thing is you might have to share a table during busy hours 
                    but don't let that take away from the experience. If anything its a 
                    chance to make new friends!"
                    customerName='Nissai K.'
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <TestimonyDetails 
                    contents="If you enjoy authentic, tasty Szechuan and Taiwanese cuisines,
                     this is the place to be! Their lunch special runs daily and on the weekends 
                     as well. If you are feeling too lazy to cook and would like some decent, 
                     spicy, Asian food, this is the place to be. If you are looking for good service, 
                     don't come here."
                    customerName='Shawn S.'
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <TestimonyDetails 
                    contents="Best place in Quincy to get Taiwanese food in my opinion. Try the fish
                     in chili oil, beef scallion pancake, oyster omelet, soup dumplings, and cumin 
                     lamb skewers - everything is delicious and reasonably priced!"
                    customerName='Victoria B.'
                />
            </Grid> 
        </Grid>
    
    </TestimonySection>
}

export const TestimonyDetails = ({ contents, customerName } : { contents: string, customerName: string}) => {
    return <>
        <span
            style={{
                color: '#fff',
                fontSize: '400%'
            }}
        >&#8220;</span>
        <div style={{
                color: '#fff',
                fontSize: '18px',
                fontStyle: 'italic',
                fontWeight: 200,
                wordSpacing: 2.5,
                lineHeight: 1.3
            }}>
            { contents }
        </div>

        <div style={{ 
            display: 'flex',
            paddingTop: '10px',
            alignItems: 'center'
        }}>
            <AiOutlineUser color='#fff' size={25}/>
            <div style={{ color: '#fff'}}>{customerName}</div>
        </div>
    </>
}