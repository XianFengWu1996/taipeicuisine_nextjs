import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { CheckBoxList } from "../../../components/admin/edit_menu/CheckboxList"
import { ImageUpload } from "../../../components/admin/edit_menu/ImageUpload"
import { TextFieldList } from "../../../components/admin/edit_menu/TextFieldList"
import { useStore } from "../../../context/storeContext"

export default function EditMenuItem () {
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
    const [file, setFile] = useState<IFile>();

    const router = useRouter();
    const { menus } = useStore();
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

    const onSaved = () => {
        
    }

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
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '90%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
            >
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
                            setFile({...newObj});
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} alignItems='center' >
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
           
            
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 15, marginBottom: 10}}>
            <Button variant="contained" sx={{ width: '50vw'}} onClick={onSaved}>Save</Button>
        </Box>
    </>
}



