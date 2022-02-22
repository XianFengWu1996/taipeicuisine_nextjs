import { Typography } from "@mui/material"
import { styled } from "@mui/system"

const Title = styled(
        Typography,
        { shouldForwardProp: prop => prop !== 'color'}
    )(({ theme, color}) => ({
    letterSpacing: '1px',
    fontFamily: 'Arial',
    textTransform: 'uppercase',
    fontWeight: 'lighter',
    textAlign: 'center',
    paddingTop: 50,
    color: color ? '#fff' : '#555',
    fontSize: '50px',
    '&::after': {
        display: 'block',
        height: '2px',
        content: '" "',
        background: '#e74c3c',
        width: '150px',
        margin: '0 auto',
        marginTop: '20px',
    },

    [theme.breakpoints.down('md')]: {
        fontSize: '35px',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        fontWeight: 'bolder'
    }
}))

export const SectionTitle = (props : { title: string, color?: string}) => {
    return <Title color={props.color}>{props.title}</Title>
 }