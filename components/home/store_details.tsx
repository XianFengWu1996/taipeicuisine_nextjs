import { Card, CardContent, Grid, Typography } from "@mui/material"
import { ReactElement, useEffect } from "react"
import { RiParkingBoxLine } from 'react-icons/ri'
import { BiShoppingBag, BiFoodMenu } from 'react-icons/bi'
import { MdDeliveryDining } from 'react-icons/md'
import { SectionTitle } from "./section_title"
import { styled } from "@mui/system"

// animation
import { motion, useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const StoreDetailSubtitle = styled(Typography)(({theme}) => ({
    textAlign: 'center',
    marginTop: '40px',
    fontFamily: 'Arial',
    color: '#555555',
    fontWeight: 'lighter',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
        padding: '0 20px'

    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
    }
}))

const StoreDetailGrid = styled(Grid)(({theme}) => ({
    padding: '60px 100px',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        padding: '40px 60px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '20px 30px',
    }
}))

export const StoreDetails = () => {
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

    return <motion.div ref={ref} initial="hidden" animate={controls} variants={{  hidden: { 
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
            duration: 3,
            ease: 'easeOut'
        }
        }}}> 
        <section style={{
                    minHeight: '100vh',
                    width: '100vw',
                    paddingBottom: '50px'
                }}>
                <SectionTitle
                        title="Best Chinese Food In - Quincy"
                />

                    <StoreDetailSubtitle variant="h6">Located On Billings Road, We offer some of the best Chinese and Taiwanese food</StoreDetailSubtitle>

                    <StoreDetailGrid container spacing={5}>
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
                                Most of the street parking are 60 and 90 minutes and free."
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
                    </StoreDetailGrid>

        </section>  
    </motion.div>
}

interface IStoreDetailCardProps {
    title: string, 
    contents: string,
    icon:ReactElement<any, any>
}

const CardContainer = styled(Card)(({theme}) => ({
    height: '45vh',
    [theme.breakpoints.down('md')]: {
        height: '30vh',
    },
    [theme.breakpoints.down('sm')]: {
        height: '50vh',
    },
}))

const CardContents = styled(Typography)(({theme}) => ({
    paddingTop: '15px', 
    lineHeight: '1.5',
    wordSpacing: '2px',
    fontSize: '18px',
    fontWeight: 'lighter',
    [theme.breakpoints.down('md')]: {
        wordSpacing: '1px',
        fontSize: '16px',
        fontWeight: 'normal',
    },
   
}))

    
export const StoreDetailCard = (props: IStoreDetailCardProps) => {
    return <CardContainer>
        <CardContent>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                {props.icon}
                <Typography style={{
                    marginLeft: '13px',
                    color: '#555',
                    fontWeight: 'normal',
                    fontSize: '19px'
                
                }}>{props.title}</Typography>
            </div>

            <CardContents>
                {props.contents}
            </CardContents>
        </CardContent>
    </CardContainer>
}