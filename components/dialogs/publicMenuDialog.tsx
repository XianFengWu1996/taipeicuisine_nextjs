import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useAppSelector } from "../../store/store";
import { ImageWithFallback } from "../images";
import { DishText, PriceText } from "../menu/menuItem";
import { AiOutlineShoppingCart} from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import { GoFlame } from 'react-icons/go'
import { v4 } from 'uuid'

const AddToCartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    minWidth: '200px',
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
interface IPublicMenuDialogProps {
    open: boolean,
    handleClose: () => void
}

export const PublicMenuDialog = (props: IPublicMenuDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 480px)');
    const { currentSelectedDish: dish } = useAppSelector(state => state.menus)

    const renderVarirant = () => {
        if(!dish.variant) return null 
        if(dish.variant.length === 0) return null
    
        return dish.variant.map((variant) => {
            return <FormControl key={v4()}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13, marginTop: 2}}>
                    {variant.en_name} {variant.ch_name}
                </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={variant.options[0].id}
                        name="radio-buttons-group"
                    >
                        {
                            variant.options.map((option) => {
                               return <FormControlLabel
                                    key={option.id} 
                                    value={option.id} 
                                    control={<Radio required size="small" />} 
                                    label={<Typography sx={{ fontSize: 14}}>{option.en_name} {option.ch_name}</Typography>}
                                /> 
                            })
                        }
                    </RadioGroup>
                </FormControl>
        })
    }
    return <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={'md'}
            fullScreen={isMobile}

        >
        <DialogContent>
            <div style={{ display: 'flex'}}>
                <ImageWithFallback src={dish.pic_url} label={dish.en_name} width={300} height={250}/>
                <div style={{ paddingLeft: 20}}>
                    <DishText>{dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy ? <GoFlame color="red"/>: null}</DishText>
                    <PriceText>${dish.price}</PriceText>
                    <Typography>{dish.description}</Typography>

                    { renderVarirant()}
                </div>
            </div>  
        </DialogContent>

        <DialogActions> 

            <QuantityContainer>
                <IconButton sx={{ color: '#000'}}><FiChevronLeft /></IconButton>
                <Typography sx={{ color: '#000', padding: '0 8px', fontWeight: 400}}>1</Typography>
                <IconButton sx={{ color: '#000'}}><FiChevronRight /></IconButton>
            </QuantityContainer>

            <AddToCartButton>
                <AiOutlineShoppingCart fontSize={18} />
                <Typography>Add to Cart</Typography>
            </AddToCartButton>
        </DialogActions>
    </Dialog>
}