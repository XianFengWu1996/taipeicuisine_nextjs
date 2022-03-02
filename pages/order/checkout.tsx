import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { useAppSelector } from "../../store/store";

export default function CheckoutPage() {
    const cartState = useAppSelector((state) => state.cart)
    return <>
        <PublicAppBar />
        <Grid container>
                <Grid item lg={8} md={7}>
                    <ButtonGroup>
                        <Button>Pick Up</Button>
                        <Button>Delivery</Button>
                    </ButtonGroup>


                    <Typography variant="h4">Customer Information</Typography>
                    <Card sx={{ width: '40%'}}>
                        <CardContent>
                            <Typography>
                                Name: Xian Feng Wu
                            </Typography>
                            <Typography>
                                Phone: 917-578-7352
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button>Edit</Button>
                        </CardActions>
                    </Card>

                    <Typography variant="h4">Delivery Address</Typography>
                    <Card sx={{ width: '40%'}}>
                        <CardContent>
                            <Typography>
                                Address: 69 Harvard St, Quincy, MA 02171
                            </Typography>
                            <Typography>
                                Apt: 1022
                            </Typography>
                            <Typography>
                                Business: Taipei Cuisine
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button>Edit</Button>
                        </CardActions>
                    </Card>


                    <Typography variant="h4">Tip</Typography>
                    <ButtonGroup>
                        <Button>10%</Button>
                        <Button>15%</Button>
                        <Button>20%</Button>
                        <Button>Custom</Button>
                    </ButtonGroup>

                    <Typography variant="h4">Payment</Typography>
                    <ButtonGroup>
                        <Button>Pay Online</Button>
                        <Button>In Store</Button>
                    </ButtonGroup>

                    <div>
                    <Button variant="contained">Continue</Button>

                    </div>
                </Grid>
                <Grid item lg={4} md={5}>
                    <Typography variant="h4" sx={{ marginTop: 5}}>Cart Summary</Typography>
                    <List style={{ width: '90%'}}>
                    {
                                cartState.cart.map((item) => {
                                    return <div key={item.id} style={{ display: 'flex', marginBottom: '3px'}}>
                                        <div style={{ width: '10%'}}>
                                        <Typography variant="subtitle2">x {item.quantity}</Typography>
                                        </div>
                                        <div style={{ width: '80%'}}>
                                            <Typography variant="subtitle2">{item.dish.label_id} {item.dish.en_name} {item.dish.ch_name}</Typography>
                                            {
                                                !isEmpty(item.option) ?<Typography sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    fontStyle: 'italic'
                                                }}>Option: {item.option.en_name} {item.option.ch_name}</Typography> : null
                                            }
                                        </div>
                                        <div style={{ width: '10%', display: 'flex', justifyContent: 'end'}}>
                                        <Typography variant="subtitle2">${item.total.toFixed(2)}</Typography>
                                        </div>

                                    </div>
                                })
                            }
                    </List>
                   

                    <List style={{ width: '90%'}}>
                    <Typography>Number of items: {cartState.cart_quantity}</Typography> 


                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Subtotal: </Typography> 
                            <Typography>${cartState.subtotal.toFixed(2)}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Delivery: </Typography> 
                            <Typography>${'0.00'}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Tax: </Typography> 
                            <Typography>${cartState.tax.toFixed(2)}</Typography>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Tip: </Typography> 
                            <Typography>${cartState.tip.toFixed(2)}</Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Typography>Total: </Typography> 
                            <Typography>${cartState.total.toFixed(2)}</Typography>
                        </div>
                        

                    </List>
                </Grid>
        </Grid>
    </>
}