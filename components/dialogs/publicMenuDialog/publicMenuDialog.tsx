import { Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { DialogImage } from "../../images";
import { AiOutlineClose, AiOutlineShoppingCart} from 'react-icons/ai'
import { GoFlame } from 'react-icons/go'
import {  ChangeEvent, useEffect, useState } from "react";
import { addToCart } from "../../../store/slice/cartSlice";
import { QuantityController } from "../../quantityController";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { ItemDetails } from "./ItemDetails";
import { DishVariant } from "./DishVariant";
import { Comments } from "./Comments";

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

    const [lunchOption, setLunchOption] = useState<{
        sub: boolean, 
        no_soup: boolean, 
        no_rice: boolean
    }>({
        sub: false,
        no_soup: false,
        no_rice: false,
    })

    const handleOnLunchOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        setLunchOption({
            ...lunchOption,
            [e.target.name]: e.target.checked 
        })

        console.log(lunchOption)
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
        props.handleClose();
        setQuantity(1);
        setTotal(dish.price);
        setOption({} as IVarirantOption)
        setRadioError(false)
        setComments('');
    }

    const handleOnRadioChange = (id: string, options: IVarirantOption[]) => {
        let option = options.find(op => op.id === id);

        if(option){ setOption(option) }    
    }

    const handleAddToCart = () => {
        if(!isEmpty(dish.variant)){
            if(isEmpty(option)){
                // set error
                return setRadioError(true);
            }
        }

        let id = dish.id;
        if(!isEmpty(option.id)){
            id = `${dish.id}${option.id}`
        }  

        if(!isEmpty(comments)){
            id = `${dish.id}${v4()}`
        }

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
        }));
        setComments('');
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



                    
           
                    <FormGroup>
                        <FormControlLabel 
                            control={<Checkbox 
                                name="sub"
                                checked={lunchOption.sub}
                                onChange={(e) => {
                                    setLunchOption({
                                        ...lunchOption,
                                        sub: e.target.checked,
                                        no_soup: e.target.checked ? false : e.target.checked,
                                    })
                                }}
                            />} label="Substitute Hot&Sour Soup" />
                        <FormControlLabel  
                            control={<Checkbox 
                                name="no_soup"
                                checked={lunchOption.no_soup}
                                onChange={handleOnLunchOptionChange}
                                disabled={lunchOption.sub}
                            />} label="No Soup"/>
                        <FormControlLabel  
                            control={<Checkbox 
                                name="no_rice"
                                checked={lunchOption.no_rice}
                                onChange={handleOnLunchOptionChange}
                            />} label="No Rice"/>

                    </FormGroup>
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


