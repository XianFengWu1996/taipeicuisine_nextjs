import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import { IconType } from "react-icons"

interface IAccountLink {
    href: string, 
    label: string, 
    LinkIcon: IconType
}

export const AccountLink = ({ href, label, LinkIcon} : IAccountLink) => {
    return <>
        <Link href={href} passHref>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:2, justifyContent: 'space-between', width: '160px', cursor: 'pointer', 
            ':hover': {
                borderBottom: '2px solid #000',
            }}}>
                <LinkIcon size={25}/>
                <Typography sx={{ fontSize: 25, ml:2}}>{label}</Typography>
            </Box> 
        </Link>
    </>
}


interface ISectionTitle {
    label: string
}

export const TitleForSection = (_: ISectionTitle) => {
    return <Typography 
        sx={{ 
            fontSize: 16,
            fontWeight: 600, 
            mr: 2, 
            textTransform: 'uppercase',
        }}>{_.label} </Typography>
}
