import { Grid, Typography } from "@mui/material"
import { SectionTitle } from "./section_title"
import OpenSign from '../../assets/images/opensign.png'
import Reservation from '../../assets/images/reservations.png'
import Image from "next/image"
import {v4} from 'uuid'
import { FaUtensils } from 'react-icons/fa'
import { styled } from "@mui/system"

// animation
import { motion, useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react"

const open_hours = [
    {
       day: 'Monday',
       close: false,
    },
    {
        day: 'Tuesday',
        close: false,
     },{
        day: 'Wednesday',
        close: false,
     },{
        day: 'Thursday',
        close: false,
     },{
        day: 'Friday',
        close: false,
     },{
        day: 'Saturday',
        close: false,
     },{
        day: 'Sunday',
        close: false,
     },
]

const ItemContainer = styled('div')(({theme}) => ({
    padding: '0 80px 40px 80px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 15px 40px 15px',
    }
}))

export const AdditionalInfo = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
          controls.start('visible');
        }
        if (!inView) {
          controls.start('hidden');
        }
      }, [controls, inView]);

    return <section style={{
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden'

    }}>
        <SectionTitle title="Additional Information" />

        <Grid 
            container 
            spacing={5}
            sx={{  paddingTop: 5 }}
          >

          
                <Grid item xs={12} md={6} justifyContent={'center'} alignItems={'center'}>
                    <motion.div ref={ref} initial="hidden" animate={controls} variants={{
                        hidden: {
                            x: -100
                        }, 
                        visible: {
                            x: 0,
                            transition:{ duration: 1}
                        }
                    }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Image src={OpenSign.src} alt="open sign" width={200} height={200} />
                    {
                        open_hours.map((hour) => {
                            return <OpenHourDisplay 
                                key={v4()}
                                date={hour.day}
                                close={hour.close}
                            />
                        })
                    }
                    </div>
                    </motion.div>

                </Grid>
            
         
                <Grid item xs={12} md={6} direction={'column'}>
                <motion.div ref={ref} initial="hidden" animate={controls} variants={{
                    hidden: {
                        x: 100
                    }, 
                    visible: {
                        x: 0,
                        transition:{ duration: 1}
                    }
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 'inherit'}}>
                        <ItemContainer>   
                            <Image src={Reservation.src} alt='reservation icon' width={150} height={100}/> 
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}>Reservation</Typography>
                            <Typography
                                sx={{
                                    fontWeight: 'light',
                                    fontSize: '20px',
                                    fontFamily: 'Arial',
                                }}
                            >Reservations are only accept over the phone and we currently only reserve table for parties of 5 or more.</Typography>
                        </ItemContainer>
                        <ItemContainer>
                            <FaUtensils  size={80}/>
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}>Catering</Typography>
                            <Typography  sx={{
                                    fontWeight: 'light',
                                    fontSize: '20px',
                                    fontFamily: 'Arial',
                                }}>We offer Catering for events. Please call in to get discuss more details. Call in a least a day ahead to allow time for prepration.</Typography>
                        </ItemContainer>
                    </div>
                    </motion.div>
                </Grid>

           
        </Grid>
    </section>
}

const OpenHourContainer = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    width: '80%',
    fontSize: '20px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        width: '90%',
    }
}))

export const OpenHourDisplay = ({ date, close } : { date: string, close: boolean }) => {
    return <OpenHourContainer>
        <div>{date.toUpperCase()}</div>
        <div>{ !close ? '11:00AM - 9:50PM' : 'Close'}</div>
    </OpenHourContainer>
}