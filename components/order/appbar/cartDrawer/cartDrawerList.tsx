import { List } from "@mui/material";
import { useAppSelector } from "../../../../store/store";
import { CartDrawerItem } from "./cartDrawerItem";

export const CartDrawerList = () => {
    const cartState = useAppSelector(state => state.cart);
    return <List sx={{ marginBottom: '100px'}}>
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