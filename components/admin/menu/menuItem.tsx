import { Card, CardContent, Grid, List, ListItem, Typography } from "@mui/material"

interface IProps {
    list: IDish[],
}

export const MenuItemList = (props: IProps) => {
    return <div style={{ margin: '3rem 2rem 0 2rem'}}>
        <Grid container spacing={4}>
                {props.list.map((dish:IDish) => {
                    return <Grid key={dish.id} item xs={12} md={6}>
                        <Card style={{ minHeight: 120}}>
                            <CardContent>
                                <Typography>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                                <Typography>{dish.description}</Typography>
                                <Typography>${dish.price.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                })}
        </Grid>
    </div>
}