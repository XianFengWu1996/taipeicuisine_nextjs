import { Checkbox, FormControlLabel, FormGroup, InputBaseComponentProps, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useState } from "react"
import Dropzone from "react-dropzone"
import { arrayBuffer } from "stream/consumers"
import { useStore } from "../../../context/storeContext"



export default function EditMenuItem () {
    const router = useRouter()
    const { menus } = useStore();

    const [label, setLabel] = useState<string>('');
    const [dish, setDish] = useState<IDish>({
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

    const { id, menuId, categoryId } = router.query;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDish({...dish, [e.target.name]: e.target.value });
    }

    const handleOnChangeNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDish({...dish, [e.target.name]: Number(e.target.value) });
    }

    const handleCheckboxChange = ((e: ChangeEvent<HTMLInputElement>) => {
        setDish({ ...dish, [e.target.name] : e.target.checked });
    })

    const uploadImage = async (files: FileList) => {

        const fd = new FormData()
        fd.append('files', files[0]);

        console.log(fd)
        let response = await axios.post(
            "http://localhost:5001/foodorder-43af7/us-central1/store/menus/image/upload",
        fd,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).catch((_) => {
            console.log(_);
        });
    }
    
    useEffect(() => {
        const foundMenu = menus.find((menu) => menu.id === menuId);
        const foundCategory = foundMenu?.category.find((category) => category.id === categoryId);
        const foundDish = foundCategory?.dishes.find((dish) =>  dish.id === id);
        if(foundDish){
             // make a clone, so we dont alter the original array
            let cloneDish:IDish = JSON.parse(JSON.stringify(foundDish));
            setDish(cloneDish);
            setLabel(`${cloneDish.label_id}. ${cloneDish.en_name} ${cloneDish.ch_name}`)
        }
    }, [])


    return <>
            <input type="file" id="file" name="file" onChange={(e) => {            
            uploadImage(e.target.files!);
        }}/>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
            >
            <Typography>Edit {label}</Typography>
            <MenuEditTextField 
                label="Label Id"
                name="label_id"
                value={dish.label_id}
                onChange={handleOnChange}
            />

            <MenuEditTextField 
                label="Dish Name (English)"
                name="en_name"
                value={dish.en_name}
                onChange={handleOnChange}
            />

            <MenuEditTextField 
                label="Dish Name (Chinese)"
                name='ch_name'
                value={dish.ch_name}
                onChange={handleOnChange}
            />

            <MenuEditTextField 
                label="Description"
                name='description'
                value={dish.description}
                required={false}
                onChange={handleOnChange}
            />

            <MenuEditTextField 
                label="Price"
                name="price"
                value={dish.price.toString()}
                type="number"
                onChange={handleOnChangeNumber}
            />

            <FormGroup row>
                <CheckBoxWithLabel 
                    label="Spicy"
                    name="is_spicy"
                    checked={dish.is_spicy}
                    onChange={handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="In Stock"
                    name="in_stock"
                    checked={dish.in_stock}
                    onChange={handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="Popular"
                    name="is_popular"
                    checked={dish.is_popular}
                    onChange={handleCheckboxChange}
                />

                <CheckBoxWithLabel 
                    label="Lunch"
                    name="is_lunch"
                    checked={dish.is_lunch}
                    onChange={handleCheckboxChange}
                />  
            </FormGroup>

       

            {/* <Dropzone onDrop={acceptedFiles => {
                acceptedFiles.map(async file => {
                    const reader = new FileReader();

                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onload = () => {
                    // Do whatever you want with the file contents
                      const binaryStr = reader.result;

                      if(binaryStr instanceof ArrayBuffer){
                        const buffer = new Uint8Array(binaryStr);
                        uploadImage(buffer);
                      }
                      

                    }
                    reader.readAsArrayBuffer(file)
                })
            }} 
                accept={'image/jpeg, image/png, image/jpg'}
                maxFiles={1}
            >
                {({getRootProps, getInputProps}) => (
                    <Paper>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag {'n'} drop some files here, or click to select files</p>
                    </div>
                    </Paper>
                )}
                </Dropzone> */}
        </Box>
    </>
}

interface ITextFieldProps {
    label: string,
    name: string, 
    value: string | number | undefined,
    onChange: (_: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    required?: boolean,
    type?: HTMLInputTypeAttribute | undefined,
}

export const MenuEditTextField = (props: ITextFieldProps) => {
    return <TextField 
        id="outlined-basic"
        label={props.label} 
        type={props.type ?? 'text'}
        variant="outlined" 
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required ?? true}
    />
}

interface ICheckbox {
    checked: boolean, 
    onChange: (_: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    name: string,
}

export const CheckBoxWithLabel = (props: ICheckbox) => {
    return <FormControlLabel control={
        <Checkbox 
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
        />
    } label={props.label} />
}