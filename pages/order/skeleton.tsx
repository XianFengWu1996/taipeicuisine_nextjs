import { Grid, Skeleton, useMediaQuery } from "@mui/material";

export default function CheckoutSkeleton  () {
    const desktop = useMediaQuery('(min-width: 900px)');

    return <>
        <Grid container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
                <Skeleton width={'90%'} height={50} variant="rectangular" sx={{ margin: '30px' }}/>

                <Skeleton width={'90%'} height={200} variant="rectangular" sx={{ margin: '30px' }}/>

                <Skeleton width={'90%'} height={50} variant="rectangular" sx={{ margin: '30px' }}/>

                <Skeleton width={'90%'} height={50} variant="rectangular" sx={{ margin: '30px' }}/>

                <Skeleton width={'90%'} height={100} variant="rectangular" sx={{ margin: '30px' }}/>

            </Grid> 

            {
                desktop && <Grid item lg={5} md={4} >
                    <Skeleton width={'90%'} height={'90%'} variant="rectangular" sx={{ margin: '30px' }}/>
                </Grid> 
            }
        </Grid>
    </>
}