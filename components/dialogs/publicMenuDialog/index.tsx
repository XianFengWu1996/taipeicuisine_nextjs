import { Button, Dialog, DialogActions, DialogContent,FormControl,IconButton, InputLabel, MenuItem, Select, Typography, useMediaQuery } from "@mui/material";
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

    const extra_protein_list = [
        {
            id: 'f9a2f119-c4bc-4a18-b346-9b7b8ce0ff05',
            en_name: 'Chicken',
            ch_name: '鸡肉',
            price: 3,
        },
        {
            id: '16d63cb0-82a8-4356-80a0-ed1295710f47',
            en_name: 'Beef',
            ch_name: '牛肉',
            price: 3,
        },
        {
            id: '9df590ce-ee27-42f1-b8fd-de69c5ca5fe3',
            en_name: 'Fatty Beef',
            ch_name: '肥牛',
            price: 8,
        }
    ]

    const extra_veggie_list = [
        {
            id: '735b7c15-2596-41f7-ae37-3970e94846fc',
            en_name: 'Mixed Vegetable',
            ch_name: '蔬菜',
            price: 3,
        },
        {
            id: '1bb54a00-253f-4ffb-b988-2b50fa450535',
            en_name: 'Mixed Vegetable',
            ch_name: '蔬菜',
            price: 5,
        },
        {
            id: '24828fb4-e428-450c-a14d-3f1d106ed566',
            en_name: 'Broccoli',
            ch_name: '西兰花',
            price: 3,
        },
        {
            id: '06321ccf-5035-4e94-93b5-474b95e8eae4',
            en_name: 'Cauliflower',
            ch_name: '花菜',
            price: 3,
        }
    ]

    const extra_condiment_list = [
        {
            id: '86ce6468-1eb5-4694-b610-07ba86455a8e',
            en_name: 'Basil',
            ch_name: '九层塔',
            price: 0,
        },
        {
            id: 'c93e4ec4-9d59-45d1-b125-6ccdb14b49c7',
            en_name: 'Scallion',
            ch_name: '葱花',
            price: 0,
        },
        {
            id: '95228f25-1186-48f8-af3a-d9910c3f7225',
            en_name: 'Garlic',
            ch_name: '大蒜',
            price: 0,
        }
    ]

    interface ICustomizeItem {
        id: string,
        en_name: string,
        ch_name: string,
        price: number,
    }
    const [protein, setProtein] = useState<ICustomizeItem[]>([])
    const [veggie, setVeggie] = useState<ICustomizeItem[]>([]);
    const [condiment, setCondiment] = useState<ICustomizeItem[]>([]);

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

                       <div>
                           <Typography>Extra Protein</Typography>

                           <FormControl sx={{ my: 1}}>
                            <InputLabel id="select-label-protein">Protein</InputLabel>
                            <Select
                                labelId="select-label-protein"
                                id="select-protein"
                                label="Protein"
                                value={''}
                                sx={{ width: '200px'}}
                                onChange={(e) => {
                                    // console.log(e.target.value)

                                    // let found_protein = extra_protein_list.find((protein) => {
                                    //     return protein.id === e.target.value
                                    // })

                                    // if(found_protein){
                                    //     setProtein(prev => 
                                    //         [...prev, {
                                    //             ...found_protein,
                                    //             id: v4(),
                                    //         }]
                                    //     )
                                    // }
                                }}
                            >
                                {
                                    extra_protein_list.map((protein) => {
                                        return <MenuItem 
                                            key={v4()} 
                                            value={protein.id}>
                                            {protein.en_name} {protein.ch_name}  + ${protein.price}</MenuItem>
                                    })
                                }

                            </Select>
                            </FormControl>
                       </div>

                       <div>
                            <Typography>Extra Veggie</Typography>

                            <FormControl sx={{ my: 1}}>
                            <InputLabel id="select-label-veggie">Veggie</InputLabel>
                            <Select
                                labelId="select-label-veggie"
                                id="select-veggie"
                                label="Veggie"
                                value={''}
                                sx={{ width: '200px'}}
                                onChange={() => {}}
                            >
                                {
                                    extra_veggie_list.map((veggie) => {
                                        return <MenuItem 
                                            key={v4()} 
                                            value={veggie.id}>{veggie.en_name} {veggie.ch_name}  + ${veggie.price}</MenuItem>
                                    })
                                }

                            </Select>
                            </FormControl>
                       </div>

                       <div>
                            <Typography>Extra Condiment</Typography>

                           <FormControl sx={{ my: 1}}>
                            <InputLabel id="select-label-condiment">Condiment</InputLabel>
                            <Select
                                labelId="select-label-condiment"
                                id="select-condiment"
                                label="Condiment"
                                value={''}
                                sx={{ width: '200px'}}
                                onChange={() => {}}
                            >
                                {
                                    extra_condiment_list.map((condiment) => {
                                        return <MenuItem 
                                            key={v4()} 
                                            value={condiment.id}>{condiment.en_name} {condiment.ch_name}</MenuItem>
                                    })
                                }

                            </Select>
                            </FormControl>  
                       </div>
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


