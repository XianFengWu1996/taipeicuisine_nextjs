import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { CheckBoxList } from "../../../components/admin/edit_menu/CheckboxList"
import { ImageUpload } from "../../../components/admin/edit_menu/ImageUpload"
import { TextFieldList } from "../../../components/admin/edit_menu/TextFieldList"

export default function EditMenuItem () {
    // const [label, setLabel] = useState<string>('');
    // const [dish, setDish] = useState<IDish>({
    //     id: '',
    //     en_name: '',
    //     ch_name: '',
    //     is_spicy:false,
    //     is_popular: false,
    //     is_lunch: false,
    //     in_stock: false,
    //     price: 0,
    //     variant: [],
    //     description: '',
    //     label_id: '',
    //     order: 0,
    //     pic_url:'',
    // });
    // const [file, setFile] = useState<IFile>();

    // const router = useRouter();
    // const { id, menuId, categoryId } = router.query;

    // const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setDish({...dish, [e.target.name]: e.target.value });
    // }

    // const handleOnChangeNumber = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setDish({...dish, [e.target.name]: Number(e.target.value) });
    // }

    // const handleCheckboxChange = ((e: ChangeEvent<HTMLInputElement>) => {
    //     setDish({ ...dish, [e.target.name] : e.target.checked });
    // })

    // const findDish = (menuId:string | string[] | undefined, categoryId:string | string[] | undefined, dishId:string | string[] | undefined) 
    //     : { dish: IDish, category_name: string} | null  => {
    //     const menu = menus.find((menu) => menu.id === menuId);

    //     if(!menu) return null;

    //     const category:ICategory | undefined = menu.category.find((category) => category.id === categoryId);

    //     if(!category) return null

    //     const dish:IDish | undefined = category.dishes.find((dish) => dish.id === dishId);

    //     if(!dish) return null

    //     return {
    //         dish,
    //         category_name: category.document_name
    //     }
    // }

    // const checkForDifference = (originalDish: { [x: string]: any }, updateDish: { [x: string]: any }) => {
    //     let difference: {[x:string]: any} = {};
    //     Object.keys(originalDish).forEach((key) => {
    //         if(originalDish[key] instanceof Array && originalDish[key].length === updateDish[key].length){
    //             return;
    //         }

    //         if(originalDish[key] !== updateDish[key]){
    //             difference[key] = updateDish[key];
    //         }
    //     })
    //     return difference
    // }

    // const onSaved = async () => {
    //     try {
    //         // will return { dish, category_name } or null if not found 
    //         const result = findDish(menuId, categoryId, id)!;
    //         // will check the difference between the original dish and the updated dish
    //         // return the difference object
    //         let difference = checkForDifference(result.dish, dish);

    //         if(file){
    //             const fd = new FormData()
    //             fd.append('files', file as File);

    //             // store the image to the storage and form a url
    //             let imageResult = await axios.post(`http://localhost:5001/foodorder-43af7/us-central1/store/menus/image/upload`,
    //                 fd, 
    //                 { headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }}
    //             );

    //             // throw error if no url was received
    //             if(!imageResult.data.url){
    //                 throw new Error('Failed to store image')
    //             }
    //             difference = {
    //                 ...difference, 
    //                 pic_url: imageResult.data.url
    //             }
    //         }

    //         await axios.patch(
    //             `http://localhost:5001/foodorder-43af7/us-central1/store/menus/${id}`,
    //             {difference},
    //             {
    //                 headers: { 'Content-Type': 'application/json'},
    //                 params: {
    //                     category_name: result.category_name,
    //                     menuId,
    //                 }
    //         });

    //         router.push('/admin/menu');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    // useEffect(() => {
    //     const foundDish = findDish(menuId, categoryId, id)?.dish;
     
    //     if(foundDish){
    //          // make a clone, so we dont alter the original array
    //         let cloneDish:IDish = JSON.parse(JSON.stringify(foundDish));
    //         setDish(cloneDish);
    //         setLabel(`${cloneDish.label_id}. ${cloneDish.en_name} ${cloneDish.ch_name}`)
    //     }
    // }, [])


    return <>
        {/* <Box
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
           
            
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 15, marginBottom: 10}}>
            <Button variant="contained" sx={{ width: '50vw'}} onClick={onSaved}>Save</Button>
        </Box> */}
    </>
}



