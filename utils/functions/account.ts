import axios from "axios";
import { handleCatchError } from "../errors/custom";

export const getOrderHistory = async (token: string) => {
    try {
        const history_result = await axios({
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_CF_URL}/auth/customer/order_history`,
            headers: {
                'Authorization':  `Bearer ${token}`,
            }
        })

        return history_result.data.order_list as IPublicOrder[];

    } catch (error) {
        console.log(error);
        handleCatchError(error as Error, 'Failed to retrieve order history')
    }
}