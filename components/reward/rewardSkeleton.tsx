import { Skeleton } from "@mui/material"

export const RewardHistorySkeleton = () => {
    return <div>
        <Skeleton variant="rectangular" width={'20%'} height={'50px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'30%'} height={'30px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'90%'} height={'60px'} sx={{ my: 2}}/>
        <Skeleton variant="rectangular" width={'40%'} height={'40px'} sx={{ my: 2}}/>
    </div>
}