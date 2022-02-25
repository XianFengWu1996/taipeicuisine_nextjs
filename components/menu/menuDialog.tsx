import { deepCopy } from "@firebase/util"
import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, Grid, IconButton, styled, Typography, useMediaQuery } from "@mui/material"
import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { handleUpdateDish } from "../../store/slice/menuSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { handleAdminTryCatchError } from "../../utils/functions/errors"
import { CheckBoxList } from "../admin/edit_menu/CheckboxList"
import { ImageUpload } from "../admin/edit_menu/ImageUpload"
import { TextFieldList } from "../admin/edit_menu/TextFieldList"
import { GoFlame } from 'react-icons/go'
import { DishText, PriceText } from "./menuItem"
import { ImageWithFallback } from "../images"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface IAdminMenuDialogProps{
    open: boolean,
    handleClose: () => void,
}

export const AdminMenuDialog = (props: IAdminMenuDialogProps) => {
    const { currentSelectedDish, currentSelectedCategory, currentSelectedMenu, menus} = useAppSelector(state => state.menus)
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<IFile>();
    const [loading, setLoading] = useState(false);
    const [dish, setDish ] = useState<IDish>({
        id: '',
        en_name: '',
        ch_name: '',
        is_spicy:false,
        is_popular: false,
        is_lunch: false,
        in_stock: false,
        price: 0,
        variant: [],
        description: '',
        label_id: '',
        order: 0,
        pic_url:'',
    });

    // const [dish , setDish] = useState<IDish>(currentSelectedDish);
    const [label, setLabel] = useState<string>();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDish({ ...dish, [e.target.name] : e.target.value} );
    }

    const handleOnChangeNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDish({...dish, [e.target.name]: Number(e.target.value) });
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, [e.target.name] : e.target.checked });
    }

    const checkForDifference = (originalDish: { [x: string]: any }, updateDish: { [x: string]: any }) => {
        let difference: {[x:string]: any} = {};
        Object.keys(originalDish).forEach((key) => {
            if(originalDish[key] instanceof Array && originalDish[key].length === updateDish[key].length){
                return;
            }

            if(originalDish[key] !== updateDish[key]){
                difference[key] = updateDish[key];
            }
        })
        return difference
    }

    const onSaved = async () => {
        setLoading(true);
        if(!loading){
            try {
                // will check the difference between the original dish and the updated dish
                // return the difference object
                let difference = checkForDifference(currentSelectedDish, dish);
    
                if(file){
                    const fd = new FormData()
                    fd.append('files', file as File);
    
                    // store the image to the storage and form a url
                    let imageResult = await axios.post(`http://localhost:5001/foodorder-43af7/us-central1/store/menus/image/upload`,
                        fd, 
                        { headers: {
                            'Content-Type': 'multipart/form-data'
                        }}
                    );
    
                    if(!imageResult.data.url){
                        throw new Error('Failed to generate image url')
                    }
                    difference = {
                        ...difference, 
                        pic_url: imageResult.data.url
                    }
    
                    setFile({} as IFile);              
                }
    
                await axios.patch(
                    `http://localhost:5001/foodorder-43af7/us-central1/store/menus/${dish.id}`,
                    {difference},
                    {
                        headers: { 'Content-Type': 'application/json'},
                        params: {
                            category_name: currentSelectedCategory.document_name,
                            menuId:  currentSelectedMenu.id
                        }
                })
                
                let newDish = {
                    ...dish,
                    ...difference
                }
    
                props.handleClose();
                dispatch(handleUpdateDish(newDish));
            } catch (error) {
                handleAdminTryCatchError(error, 'Failed to update dish'); 
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        let deepCopyDish = deepCopy(currentSelectedDish);

        setDish(deepCopyDish)
        setLabel(`${deepCopyDish.label_id}. ${deepCopyDish.en_name} ${deepCopyDish.ch_name}`);
    }, [currentSelectedDish])

    return <Dialog open={props.open} onClose={props.handleClose} maxWidth='lg' >
        <DialogContent sx={{ padding: '5%'}}>
            <form>
                <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Typography style={{
                                marginBottom: 20
                            }}>Edit {label}</Typography>
        
                            <ImageUpload
                                file={file}
                                pic_url={dish.pic_url}
                                handleOnDrop={acceptedFiles => {
                                    let newObj = Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0])});
                                    setFile(newObj);
                                }}
                            />
                        </Grid>

                <Grid item xs={12} md={7} alignItems='center' >
                    <TextFieldList
                        dish={dish}
                        handleOnChange={handleOnChange}
                        handleOnChangeNumber={handleOnChangeNumber}
                    />

                    <CheckBoxList
                        dish={dish}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                </Grid>
                </Grid>
            </form>
            
        </DialogContent>

        <DialogActions>
            <LoadingButton 
                loading={loading}
                variant="contained" 
                fullWidth 
                onClick={onSaved}
            >Save</LoadingButton>
            <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
}

const AddToCartButton = styled(Button)(({theme}) => ({
    backgroundColor: '#555',
    minWidth: '200px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px'
}))

interface IPublicMenuDialogProps {
    open: boolean,
    handleClose: () => void
}

export const PublicMenuDialog = (props: IPublicMenuDialogProps) => {
    const isMobile = useMediaQuery('(max-width: 480px)');
    const { currentSelectedDish: dish } = useAppSelector(state => state.menus)

    return <Dialog 
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={'md'}
            fullScreen={isMobile}

        >
        <DialogContent>
            <div style={{ display: 'flex'}}>
                <ImageWithFallback src={dish.pic_url} label={dish.en_name} width={250} height={200}/>
                <div style={{ paddingLeft: 20}}>
                    <DishText>{dish.label_id}. {dish.en_name} {dish.ch_name} {dish.is_spicy ? <GoFlame color="red"/>: null}</DishText>
                    <PriceText>${dish.price}</PriceText>
                    <Typography>{dish.description}</Typography>
                </div>
            </div>  
        </DialogContent>

        <DialogActions> 

            <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                width: '120px',
                backgroundColor: '#fff',
                marginRight: 10,
                border: '1px solid #000',
                borderRadius: '100px'
            }}>
                <IconButton sx={{ color: '#000'}}><FiChevronLeft /></IconButton>
                <Typography sx={{ color: '#000', padding: '0 8px', fontWeight: 400}}>1</Typography>
                <IconButton sx={{ color: '#000'}}><FiChevronRight /></IconButton>
            </div>

            <AddToCartButton>
                <AiOutlineShoppingCart fontSize={18} />
                <Typography>Add to Cart</Typography>
            </AddToCartButton>
        </DialogActions>
    </Dialog>
}

