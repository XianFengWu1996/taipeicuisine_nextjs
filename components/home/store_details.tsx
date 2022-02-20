import { Card, CardContent, Grid, Typography } from "@mui/material"
import { ReactElement } from "react"
import { RiParkingBoxLine } from 'react-icons/ri'
import { BiShoppingBag, BiFoodMenu } from 'react-icons/bi'
import { MdDeliveryDining } from 'react-icons/md'
import { SectionTitle } from "./section_title"

export const StoreDetails = () => {
    return <section style={{
        height: '100vh',
        width: '100vw'
    }}>
       <SectionTitle
            title="Best Chinese Food In - Quincy"
       />

        <Typography 
            variant="h6"
            style={{
            textAlign: 'center',
            marginTop: '40px',
            fontFamily: 'Arial',
            color: '#555555',
            fontWeight: 'lighter'
        }}>Located On Billings Road, We offer some of the best Chinese and Taiwanese food</Typography>

        <Grid container spacing={5} alignItems={'center'} sx={{ padding: '60px 100px'}}>
            <Grid item xs={12} md={6} lg={3}>
                <StoreDetailCard 
                    title="Delivery"
                    icon={<MdDeliveryDining size={30} />}
                    contents="Delivery time are around 50 minutes. 
                    But time may varies during peak hours & bad weathers.
                    Delivery fees starts from $2 with the limit of around 6 miles,
                    and the fee will be calculate at the time of the order."
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <StoreDetailCard 
                    title="Pick Up"
                    icon={<BiShoppingBag size={30} />}
                    contents="The pick up time are usually around 15 minutes. 
                    But may varies during peak hours, size of the order, etc.
                    All the dumplings and buns are house-made and steam upon request and may take around 10-15 minutes."
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <StoreDetailCard 
                    title="Parking"
                    icon={<RiParkingBoxLine size={30} />}
                    contents="Street parking are available all around the restaurant 
                    and there is a public parking lot across the resturant in Vane Street. 
                    Most of the street parking are 60 and 90 minutes and free"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <StoreDetailCard 
                    title="Flavors"
                    icon={<BiFoodMenu size={30}/>}
                    contents="Offering the best dishes from SiChuan and Taiwan. 
                    The dishes are created by chefs who are high experienced with the styles. 
                    Sichuan food is really about a variety of flavors: spicy, flowery (Sichuan peppercorns), salty, sour, sweet, smoky, etc"                />
            </Grid>
        </Grid>

    </section>
}

interface IStoreDetailCardProps {
    title: string, 
    contents: string,
    icon:ReactElement<any, any>
}

export const StoreDetailCard = (props: IStoreDetailCardProps) => {
    return <Card style={{ height: '50vh'}}>
        <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent:'space-between'}}>
                {props.icon}
                <Typography 
                    style={{ 
                        textTransform: 'uppercase',
                        color: '#555',
                        fontWeight: 'lighter',
                        fontSize: '20px'
                    }}
                >{props.title}</Typography>
            </div>

            <Typography style={{ 
                paddingTop: '15px', 
                lineHeight: '1.5',
                wordSpacing: '2px',
                fontSize: '18px',
                fontWeight: 'lighter'
            }}>
                {props.contents}
            </Typography>
        </CardContent>
    </Card>
}