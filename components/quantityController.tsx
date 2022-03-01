import { IconButton, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'


const QuantityContainer = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
    border: '1px solid #000',
    borderRadius: '100px'
}))

interface IQuantityControllerProps {
    quantity: number,
    handleDecrease: () => void,
    handleIncrease: () => void,
    width?: string,
    height?: string,
    fontSize?: string,
    leftRightPadding?: number, 
}

export const QuantityController = (props: IQuantityControllerProps) => {
    return <QuantityContainer sx={{
        width: props.width ?? '120px',
        height: props.height ?? '40px'
    }}>
        <IconButton  sx={{ color: '#000'}} onClick={props.handleDecrease} disabled={props.quantity <= 1}><FiChevronLeft /></IconButton>
        <Typography sx={{ 
            color: '#000', 
            padding: `0 ${props.leftRightPadding ?? 8}px`, 
            fontSize: props.fontSize ?? '17px' , 
            fontWeight: 400}
        }>
                {props.quantity}
        </Typography>
        <IconButton sx={{ color: '#000'}} onClick={props.handleIncrease}><FiChevronRight /></IconButton>
    </QuantityContainer>
}