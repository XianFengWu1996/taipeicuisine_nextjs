import { Typography } from "@mui/material"

export const SectionTitle = ({ title, color } : { title: string, color?: string}) => {
    return <Typography
     style={{
         letterSpacing: '1px',
         fontFamily: 'Arial',
         textTransform: 'uppercase',
         fontWeight: 'lighter',
         color: color ?? '#555',
         textAlign: 'center',
         paddingTop: 50,
         fontSize: '50px'
     }}
     sx={{
         '&::after': {
             display: 'block',
             height: '2px',
             content: '" "',
             background: '#e74c3c',
             width: '150px',
             margin: '0 auto',
             marginTop: '20px',
         }
     }}
     >
         {title}
     </Typography>
 }