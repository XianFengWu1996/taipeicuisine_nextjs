import { Card, CardContent, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { getCurrentDish } from "../../../store/slice/menuSlice";
import { useAppDispatch } from "../../../store/store"

interface IProps {
    list: IDish[],
    menuId: string,
    categoryId: string,
}

export const MenuItemList = (props: IProps) => {
    const dispatch = useAppDispatch();

    return <div style={{ margin: '1.5rem 2rem'}}>
        <Grid container spacing={2}>
                {props.list.map((dish:IDish) => {
                    return <Grid key={dish.id} item xs={12} md={6}>
                        <Card style={{ minHeight: 120}} onClick={() => {
                            // console.log(asPath);
                            // Router.push({
                            //     pathname:`menu/${dish.id}`,
                            //     query: {
                            //         menuId: props.menuId,
                            //         categoryId: props.categoryId
                            //     }
                            // })

                            dispatch(getCurrentDish(dish));
                        }}>
                            <CardContent sx={{ display: 'flex'}}>
                                    {
                                        dish.pic_url && typeof dish.pic_url === 'string' ? <Image 
                                            src={dish.pic_url} 
                                            alt={`picture for ${dish.en_name}`} 
                                            width={125}
                                            height={80} 
                                        /> : null
                                    }

                                    <div style={{ padding: '0 1.5rem'}}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: 16}}>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '14px'}}>${dish.price.toFixed(2)}</Typography>
                                        <Typography>{dish.description}</Typography>
                                    </div>                                
                            </CardContent>
                        </Card>
                    </Grid>
                })}
        </Grid>
    </div>
}