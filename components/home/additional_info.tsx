import { Grid, Typography } from "@mui/material"
import { SectionTitle } from "./section_title"
import OpenSign from '../../assets/images/opensign.png'
import Reservation from '../../assets/images/reservations.png'
import Image from "next/image"
import {v4} from 'uuid'
import { FaUtensils } from 'react-icons/fa'

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

export const AdditionalInfo = () => {
    return <section style={{
        minHeight: '100vh',
        width: '100vw',
    }}>
        <SectionTitle title="Additional Information" />

        <Grid 
            container 
            spacing={5}
            sx={{  paddingTop: 5 }}
          >
            <Grid item xs={12} md={6} justifyContent={'center'} alignItems={'center'}>
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
            </Grid>

            <Grid item xs={12} md={6} direction={'column'}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 'inherit'}}>
                    <div style={{ paddingBottom: 50}}>   
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
                    </div>
                    <div>
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
                    </div>
                </div>
            </Grid>
        </Grid>
    </section>
}


export const OpenHourDisplay = ({ date, close } : { date: string, close: boolean }) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '400px',
        padding: '5px 0',
        fontSize: '20px',
        fontWeight: 'bold'
    }}>
        <div>{date.toUpperCase()}</div>
        <div>{ !close ? '11:00AM - 9:50PM' : 'Close'}</div>
    </div>
}