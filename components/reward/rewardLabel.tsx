import { Typography } from "@mui/material"

interface IRewardTextWithLabel {
    label: string, 
    text: string |  number,
    negative?: boolean,
}
export const RewardTextWithLabel = (_: IRewardTextWithLabel) => {
    return <div>
        <Typography sx={{ fontSize: 10, textTransform: 'capitalize'}}>{_.label}</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 500,textTransform: 'capitalize'}}>{_.negative ? `(-${_.text})`: _.text}</Typography>
    </div>
}