import { Button, Dialog, DialogActions, DialogContent,IconButton, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch } from "../../../store/store";
import { DialogImage } from "../../images";
import { AiOutlineClose, AiOutlineShoppingCart} from 'react-icons/ai'
import {  ChangeEvent, useEffect, useState } from "react";
import { addToCart } from "../../../store/slice/cartSlice";
import { QuantityController } from "../../quantityController";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { ItemDetails } from "./ItemDetails";
import { DishVariant } from "./DishVariant";
import { Comments } from "./Comments";
import { LunchOption } from "./LunchOption";
import { Customize } from "./Customize";

export interface ICustomizeItem {
    id: string,
    en_name: string,
    ch_name: string,
    price: number,
}

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

interface IPublicMenuDialogProps {
    open: boolean,
    handleClose: () => void,
    dish: IDish,
}

export const PublicMenuDialog = ({ open, handleClose, dish}: IPublicMenuDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 480px)'); // check if it' mobile 
    const dispatch = useAppDispatch();
    
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(dish.price)
    const [option, setOption] = useState({} as IVarirantOption)
    const [radioError, setRadioError] = useState(false);
    const [comments, setComments] = useState('');

    const lunchOptionInitialState:ILunchOption = {
        sub: false,
        no_soup: false,
        no_rice: false,
    }
    const [lunchOption, setLunchOption] = useState<ILunchOption>(lunchOptionInitialState)

    const handleOnLunchOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLunchOption({
            ...lunchOption,
            [e.target.name]: e.target.checked 
        })
    }

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
        handleClose();
        setQuantity(1);
        setTotal(dish.price);
        setOption({} as IVarirantOption)
        setRadioError(false)
        setComments('');
        setLunchOption(lunchOptionInitialState)
    }

    const handleOnRadioChange = (id: string, options: IVarirantOption[]) => {
        let option = options.find(op => op.id === id);

        if(option){ setOption(option) }    
    }

    const handleCartItemIdGeneration = () => {
        // lunch wont contain options but it might have comments, if it has comments, it will be it's own cart item
        if(!isEmpty(comments)){
            return `${dish.id}${v4()}`
        }

        if(!isEmpty(option.id)){
            return `${dish.id}${option.id}`
        }

        // if sub and no_rice both true
        if(lunchOption.sub && lunchOption.no_rice){
            return `${dish.id}24e53f2a-ba72-4726-b1e2-063779de48db`
        }

        // if no_soup and no_rice both true
        if(lunchOption.no_soup && lunchOption.no_rice){
            return `${dish.id}cb0a70ca-5aa5-4a3d-8198-e4c49731d2a8`
        }

        // for individual case
        if(lunchOption.sub){
            return `${dish.id}baa60cee-c472-4f8b-979e-313c71cc9efe`
        }

        if(lunchOption.no_soup){
            return `${dish.id}01cefbec-744b-4a52-90cf-acae76474e3c`
        }

        if(lunchOption.no_rice){
            return `${dish.id}05b1938d-4db0-4135-ba59-8100a4ef1edc`
        }

        // if nothing match, we will just return the dish id 
        return dish.id
    }

    const handleAddToCart = () => {
        if(!isEmpty(dish.variant)){
            if(isEmpty(option)){
                // set error
                return setRadioError(true);
            }
        }

        let id = handleCartItemIdGeneration();
        
        dispatch(addToCart({
            id,
            dish: {
                ...dish,
                price: dish.price + (option.price ?? 0)
            },
            quantity: quantity,
            option: option,
            comment: comments,
            total: total,
            lunchOption: dish.is_lunch ? lunchOption : null
        }));
        handleDialogClose();
    }

    const handleOnSubChange = (e: ChangeEvent<HTMLInputElement>) => {
        // when sub is true, no_soup will be false
        setLunchOption({
            ...lunchOption,
            sub: e.target.checked,
            no_soup: e.target.checked ? false : e.target.checked,
        })
    }

    // set the total as the select dish price for one, will only change when the dish change
    useEffect(() => {
        // dish price will only change when the user select a different dish
        setTotal(dish.price) 
    }, [dish])

    // // will calculate the total, if quantity, the option price, or dish changes
    useEffect(() => {
        let temp = quantity * (dish.price + (option.price ?? 0));
        setTotal(temp);
    }, [quantity, option.price])


    return <Dialog
            open={open}
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
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <DialogImage src={dish.pic_url} label={dish.en_name} width={300} height={300}/>
                    </div>
                    <div style={{ paddingLeft: isMobile ? 0 : 20, display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <ItemDetails dish={dish}/>
                        <DishVariant 
                            variant={dish.variant}
                            radioError={radioError}
                            handleOnRadioChange={handleOnRadioChange}
                        />

                        <Comments handleOnBlur={(e) => {
                            setComments(e.target.value)
                        }}/>

                       {
                           dish.is_lunch &&  <LunchOption
                                lunchOption={lunchOption}
                                handleOnOptionChange={handleOnLunchOptionChange}
                                handleOnSubChange={handleOnSubChange}
                            />
                       }
                    
                       <div>
                            <Button variant="text">Customize</Button>
                       </div>

                       <Customize />

             
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




