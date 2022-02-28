import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useAppSelector } from "../../store/store";
import { ImageWithFallback } from "../images";
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import { GoFlame } from 'react-icons/go'
import {  useEffect, useState } from "react";

const AddToCartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    minWidth: '250px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px'
}))

const QuantityContainer = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    width: '120px',
    backgroundColor: '#fff',
    marginRight: 10,
    border: '1px solid #000',
    borderRadius: '100px'
}))

const DishText = styled(Typography)(({theme}) => ({
    fontSize: 20, 
    fontWeight: 600
}))

const PriceText = styled(Typography)(({theme}) => ({
    fontSize: 15, 
    fontStyle: 'italic', 
    fontWeight: 500
}))


interface IPublicMenuDialogProps {
    open: boolean,
    handleClose: () => void
}

export const PublicMenuDialog = (props: IPublicMenuDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 480px)'); // check if it' mobile 
    const { currentSelectedDish: dish } = useAppSelector(state => state.menus)

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0)
    const [option, setOption] = useState({
        price: 0
    } as IVarirantOption)

    // QUANTITY HANDLER
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);   
    }

    const decreaseQuantity = () => {
        if(quantity > 1){
            setQuantity(prev => prev - 1);
        }
    }

    const handleDialogClose = () => {
        props.handleClose();
        setQuantity(1);
        setTotal(dish.price);
        setOption({ price: 0 } as IVarirantOption)
    }

    const handleOnRadioChange = (id: string, options: IVarirantOption[]) => {
        let option = options.find(op => op.id === id);

        if(option){
            setOption(option);
        }    
    }

    // set the total as the select dish price for one, will only change when the dish change
    useEffect(() => {
        setTotal(dish.price)
    }, [dish])

    // will calculate the total, if quantity, the option price, or dish changes
    useEffect(() => {
        let temp = quantity * (dish.price + option.price);
        setTotal(temp);
    }, [quantity, option.price, dish])

    const renderVarirant = () => {
        if(!dish.variant) return null 
        if(dish.variant.length === 0) return null
    
        return dish.variant.map((variant) => {
            return <FormControl key={variant.id}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13, marginTop: 2}}>{variant.en_name} {variant.ch_name}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={variant.options[0].id}
                        name="radio-buttons-group"
                        onChange={(_, value) => {
                            handleOnRadioChange(value, variant.options);
                        }}
                    >
                        {
                            variant.options.map((option) => {
                               return <FormControlLabel
                                    key={option.id} 
                                    value={option.id} 
                                    control={<Radio required size="small" />} 
                                    label={<Typography sx={{ fontSize: 14}}>{option.en_name} {option.ch_name} +${option.price.toFixed(2)}</Typography>}
                                /> 
                            })
                        }
                    </RadioGroup>
                </FormControl>
        })
    }

    return <Dialog
            open={props.open}
            onClose={handleDialogClose}
            fullWidth
            maxWidth={'md'}
            fullScreen={isMobile}
        >
        <DialogContent>
            <div style={{ display: 'flex'}}>
                <ImageWithFallback src={dish.pic_url} label={dish.en_name} width={300} height={250}/>
                <div style={{ paddingLeft: 20}}>
                    <DishText>
                        {dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy ? <GoFlame color="red"/>: null}
                    </DishText>
                    <PriceText>${dish.price}</PriceText>
                    <Typography>{dish.description}</Typography>

                    { renderVarirant() }
                </div>
            </div>  
        </DialogContent>

        <DialogActions> 
            <QuantityContainer>
                <IconButton  sx={{ color: '#000'}}  onClick={decreaseQuantity} disabled={quantity <= 1}><FiChevronLeft /></IconButton>
                <Typography sx={{ color: '#000', padding: '0 8px', fontWeight: 400}}>{quantity}</Typography>
                <IconButton sx={{ color: '#000'}}  onClick={increaseQuantity}><FiChevronRight /></IconButton>
            </QuantityContainer>

            <AddToCartButton>
                <AiOutlineShoppingCart fontSize={18} />
                <Typography>Add to Cart | ${total ? total.toFixed(2): 0}</Typography>
            </AddToCartButton>
        </DialogActions>
    </Dialog>
}