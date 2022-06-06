import { Grid, Typography } from "@mui/material"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { handleCatchError, NotAuthorizeError } from "../../utils/errors/custom"
import { fbAuth } from "../../utils/functions/auth"
import { handleGetPaymentList } from "../../utils/functions/payment"
import { WalletSkeleton } from "./walletSkeleton"

export const WalletPage = () => {
    const [cards, setCards] = useState<IPublicPaymentMethod[]>([])

    const [isReady, setIsReady] = useState<boolean>(false);

    const handleRemoveCardWithId = (id: string) => {
        let temp_cards = cards.filter(card => id !== card.id);
        setCards(temp_cards);
    }

    useEffect(() => {
        try {
            onAuthStateChanged(fbAuth, async user => {
                if(!user){
                    throw new NotAuthorizeError();
                }

                await handleGetPaymentList(await user.getIdToken(), setCards)
                setIsReady(true);

            })
        } catch (error) {
            handleCatchError(error as Error, 'Failed to get payment lsit');
        }
    }, [])
    return <>
        <Typography variant="h4">Wallet</Typography>
        {/* {
            isReady && isEmpty(cards) 
                ? <Typography>To add a card to the wallet, select &ldquo;I want to save this card for future purchase
                &rdquo; option during online checkout</Typography> 
                : <Grid container spacing={3} sx={{ width: '95%'}}>
                    {
                        cards.map((card) => {
                            return <WalletCard key={card.id} card={card} handleRemoveCardWithId={handleRemoveCardWithId}/>
                        })
                    }
                </Grid>
        } */}

            <Grid container spacing={3} sx={{ width: '95%'}}>
                <WalletSkeleton />
                <WalletSkeleton />
                <WalletSkeleton />
                <WalletSkeleton />
                <WalletSkeleton />
                <WalletSkeleton />

            </Grid>
    </>
}




