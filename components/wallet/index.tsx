import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material"
import { blue, red } from "@mui/material/colors"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { FaCheckCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa"
import { handleCatchError, NotAuthorizeError } from "../../utils/errors/custom"
import { fbAuth } from "../../utils/functions/auth"
import { handleGetPaymentList } from "../../utils/functions/payment"
import { handleCreditCardBrand } from "../history/orderPayment"

export const WalletPage = () => {
    const [cards, setCards] = useState<IPublicPaymentMethod[]>([])

    useEffect(() => {
        try {
            onAuthStateChanged(fbAuth, async user => {
                if(!user){
                    throw new NotAuthorizeError();
                }

                await handleGetPaymentList(await user.getIdToken(), setCards)

            })
        } catch (error) {
            handleCatchError(error as Error, 'Failed to get payment lsit');
        }
    }, [])
    return <>
        <Typography variant="h4">Wallet</Typography>
        <Grid container spacing={3} sx={{ width: '95%'}}>
            {
                cards.map((card) => {
                    return <WalletCard key={card.id} card={card}/>
                })
            }
        </Grid>
    </>
}


interface IWalletCard {
    card: IPublicPaymentMethod
}

export const WalletCard = ({ card} : IWalletCard) => {
    const [start_removal, setStartRemoval] = useState<boolean>(false);


    return <Grid item lg={6} md={12} sm={12} xs={12} sx={{ position: 'relative'}}>
        <IconButton sx={{ position: 'absolute', color: red[500], right: -15, top: 5 }} onClick={() => setStartRemoval(true)}>
            <FaMinusCircle />
        </IconButton>
        <Card key={card.id}>
            <CardContent> 
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Typography>{handleCreditCardBrand(card.card.brand)}</Typography>
                    <Typography sx={{ ml: 2}}> XX-{card.card.last_four}</Typography>
                </div>
                <Typography>Expiration: {card.card.exp_month} / {card.card.exp_year}</Typography>
                
                {
                    start_removal && <Box sx={{ mt: 3}}>
                    <Box sx={{ width: '60%' }}>
                        <TextField 
                            // error
                            label={`Type "${card.card.last_four}" To Confirm`}
                            size='small'
                            fullWidth
                        />
                        {/* <IconButton sx={{ color: red[400]}}><FaCheckCircle/></IconButton> */}
                        <Box sx={{ my: 2}}>
                            <Button variant="contained" size="small" sx={{ backgroundColor: red[400], mr: 1}}>Confirm</Button>
                            <Button variant="text" size="small" onClick={() => setStartRemoval(false)}>Cancel</Button>    
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: 11, fontWeight: 600}}>To make sure this is not a mistake, please type in the last four digit of the card number to confirm</Typography>

                    </Box>

                }
            </CardContent>
        </Card>
    </Grid>
}