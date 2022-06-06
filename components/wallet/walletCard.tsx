import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { handleCatchError } from "../../utils/errors/custom";
import { fbAuth } from "../../utils/functions/auth";
import { handleCreditCardBrand } from "../history/orderPayment";
import snackbar from "../snackbar";

interface IWalletCard {
    card: IPublicPaymentMethod,
    handleRemoveCardWithId: (id:string) => void
}

export const WalletCard = ({ card, handleRemoveCardWithId } : IWalletCard) => {
    const [start_removal, setStartRemoval] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<string>('');

    const handleOnCancel = () => {
        setStartRemoval(false);
    }

    const handleOnConfirm = async () => {
        if(confirmation === card.card.last_four){
            try {
                await axios({
                    method: 'DELETE',
                    url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/payment_method`,
                    data: { payment_method_id: card.id  },
                    headers: { "Authorization": `Bearer ${await fbAuth.currentUser?.getIdToken()}` }
                })

                handleRemoveCardWithId(card.id);
                snackbar.success('Card has been successfully removed')                
            } catch (error) {
                handleCatchError((error as Error), 'Failed  to delete payment')
            }
        }
    }


    return <Grid item lg={6} md={12} sm={12} xs={12} sx={{ position: 'relative'}}>
        <IconButton sx={{ position: 'absolute', color: red[500], right: -15, top: 5 }} onClick={() => setStartRemoval(true)}>
            <FaMinusCircle />
        </IconButton>
        <Card>
            <CardContent> 
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Typography>{handleCreditCardBrand(card.card.brand)}</Typography>
                    <Typography sx={{ ml: 2}}> XX-{card.card.last_four}</Typography>
                </div>

                <Typography>Expiration: {card.card.exp_month} / {card.card.exp_year}</Typography>
                
                {
                    start_removal && <Box sx={{ mt: 3}}>
                        <TextField
                            // error
                            label={`Type "${card.card.last_four}" To Confirm`}
                            size='small'
                            sx={{ width: '60%' }}
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                        />
                        <Box sx={{ my: 2}}>
                            <Button
                                variant="contained" 
                                size="small" 
                                sx={{ backgroundColor: red[400], mr: 1}}
                                onClick={handleOnConfirm}
                            >Confirm</Button>
                            <Button variant="text" size="small" onClick={handleOnCancel}>Cancel</Button>    
                        </Box>

                        <Typography sx={{ fontSize: 11, fontWeight: 600}}>To make sure this is not a mistake, please type in the last four digit of the card number to confirm</Typography>

                    </Box>

                }
            </CardContent>
        </Card>
    </Grid>
}