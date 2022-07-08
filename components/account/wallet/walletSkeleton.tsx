import { Grid, Skeleton } from "@mui/material"

export const WalletSkeletons = () => {
    return <Grid container spacing={3} sx={{ width: '95%'}}>
        <WalletSkeleton />
        <WalletSkeleton />
        <WalletSkeleton />
        <WalletSkeleton />
        <WalletSkeleton />
        <WalletSkeleton />
    </Grid>
}

const WalletSkeleton = () => {
    return <>
        <Grid item lg={6} md={12} sm={12} xs={12}>
            <Skeleton variant="rectangular" height={110} animation="wave"/>
        </Grid>
    </>
}