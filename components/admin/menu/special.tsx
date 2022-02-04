import { Card, CardContent, Grid, Typography } from "@mui/material"

interface IProps {
    special: IDish[],
    title: string,
}

export const Special = (props: IProps) => {
    return <>
        <Typography variant="h4" 
            style={{ 
                textDecorationLine: 'underline',
                margin: '2rem 0',
            }}
        >{props.title}</Typography>
        <Grid container spacing={3}>
            {props.special.map((dish:IDish) => {
                return <Grid key={dish.id} item xs={12} md={6}>
                    <Card style={{ minHeight: 120}}>
                        <CardContent>
                            <Typography>{dish.label_id}. {dish.en_name} {dish.ch_name}</Typography>
                            <Typography>{dish.description}</Typography>
                            <Typography>${dish.price}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            })}
        </Grid>
    </>
}