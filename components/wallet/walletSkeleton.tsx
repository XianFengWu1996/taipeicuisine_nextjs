import { Grid, Skeleton } from "@mui/material"

export const WalletSkeleton = () => {
    return <>
        <Grid item lg={6} md={12} sm={12} xs={12}>
            <Skeleton variant="rectangular" height={170} animation="wave"/>
        </Grid>
    </>
}