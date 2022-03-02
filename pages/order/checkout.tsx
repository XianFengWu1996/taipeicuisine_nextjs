import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { PublicAppBar } from "../../components/order/appbar/appbar";
import { CartSummary } from "../../components/order/checkout/cartSummary";
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
                    <CartSummary />
                </Grid>
        </Grid>
    </>
}