import { Skeleton } from "@mui/material"

export const OrderHistorySkeleton = () => {
    return <div>
        <Skeleton variant="rectangular" width={'25%'} height={'50px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'85%'} height={'100px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'85%'} height={'100px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'85%'} height={'100px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'85%'} height={'100px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'40%'} height={'40px'} sx={{ my: 2}}/>

    </div>
}