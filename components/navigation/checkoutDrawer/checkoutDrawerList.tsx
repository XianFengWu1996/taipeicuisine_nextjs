import { List } from "@mui/material";
import { useAppSelector } from "../../../store/store";
import { CartDrawerItem } from "./checkoutDrawerItem";

export const CartDrawerList = () => {
    const cartState = useAppSelector(state => state.cart);
    return <List sx={{ pb: 10}}>
        {
            cartState.cart.map((item) => {
                return <CartDrawerItem
                    key={item.id}
                    item={item}
                />
            })
        }
    </List>
}