import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageWithFallback } from "../images";
import { AiOutlineClose, AiOutlineShoppingCart} from 'react-icons/ai'
import { GoFlame } from 'react-icons/go'
import {  useEffect, useState } from "react";
import { addToCart } from "../../store/slice/cartSlice";
import { QuantityController } from "../quantityController";
import { isEmpty } from "lodash";

const AddToCartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    minWidth: '250px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',

    [theme.breakpoints.down('sm')]: {
        marginTop: 10
    }
}))

const DishText = styled(Typography)(() => ({
    fontSize: 20, 
    fontWeight: 600
}))

const PriceText = styled(Typography)(() => ({
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
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0)
    const [option, setOption] = useState({} as IVarirantOption)
    const [radioError, setRadioError] = useState(false);
    const [comments, setComments] = useState('');

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
        setOption({} as IVarirantOption)
        setRadioError(false)
    }

    const handleOnRadioChange = (id: string, options: IVarirantOption[]) => {
        let option = options.find(op => op.id === id);

        if(option){
            setOption(option);
        }    
    }

    const handleAddToCart = () => {
        if(!isEmpty(dish.variant)){
            if(isEmpty(option)){
                // set error
                setRadioError(true);
                return;
            }
        }

        dispatch(addToCart({
            id: option.id ? `${dish.id}${option.id}` :dish.id,
            dish: {
                ...dish,
                price: dish.price + (option.price ?? 0)
            },
            quantity: quantity,
            option: option,
            comment: '',
            total: total,
        }));
        handleDialogClose();
    }

    // set the total as the select dish price for one, will only change when the dish change
    useEffect(() => {
        // dish price will only change when the user select a different dish
        setTotal(dish.price) 
    }, [dish])

    // will calculate the total, if quantity, the option price, or dish changes
    useEffect(() => {
        let temp = quantity * (dish.price + (option.price ?? 0));
        setTotal(temp);
    }, [quantity, option.price])

    const renderVarirant = () => {
        if(!dish.variant) return null 
        if(dish.variant.length === 0) return null
    
        return dish.variant.map((variant) => {
            return <FormControl key={variant.id}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ 
                        fontSize: 13, 
                        marginTop: 2,
                        color: radioError ? 'red' : 'black'
                    }}>{variant.en_name} {variant.ch_name}* {radioError ? '(Please Select One)' : ''}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
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
                                    label={
                                        <Typography sx={{ fontSize: 14 }}>
                                            {option.en_name} {option.ch_name} 
                                            +${option.price.toFixed(2)} 
                                            {option.spicy ? <GoFlame color="red"/>: null}
                                        </Typography>}
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
            <IconButton onClick={handleDialogClose}>
                <AiOutlineClose />
            </IconButton>

            <div style={{ display: isMobile ? 'block' : 'flex'}}>
                    <ImageWithFallback src={dish.pic_url} label={dish.en_name} width={300} height={250}/>
                    <div style={{ paddingLeft: isMobile ? 0 : 20, display: 'flex', flexDirection: 'column'}}>
                        <DishText>
                            {dish.label_id}. {dish.en_name} {dish.ch_name} 
                            {isEmpty(dish.variant) && dish.is_spicy ? <GoFlame color="red"/>: null }
                        </DishText>
                        <PriceText>${dish.price}</PriceText>
                        <Typography>{dish.description}</Typography>


                        { renderVarirant() }
                    <TextField 
                        multiline
                        minRows={2} 
                        sx={{ m: 0.5}}
                        placeholder="Leave comment specific to this dish, such as spicy level, allergies, etc"
                        onBlur={(e) => {
                            setComments(e.target.value);
                        }}
                    />
                </div>


            </div>  
        </DialogContent>

        <DialogActions sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignContent: 'center'}}> 
            <QuantityController
                quantity={quantity}
                handleIncrease={increaseQuantity}
                handleDecrease={decreaseQuantity}
            />

            <AddToCartButton onClick={handleAddToCart}>
                <AiOutlineShoppingCart fontSize={18} />
                <Typography>Add to Cart | ${total ? total.toFixed(2): 0}</Typography>
            </AddToCartButton>
        </DialogActions>
    </Dialog>
}