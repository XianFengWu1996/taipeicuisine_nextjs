import { useEffect } from "react"
import { orderComplete } from "../../store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function Confirmation () {
    const dispatch = useAppDispatch();


    useEffect(() => {

        // submit the order our backend
        // await axios({
        //     method: 'POST',
        //     url: `${process.env.NEXT_PUBLIC_CF_URL}/payment/confirm`,
        //     headers: { 'Authorization': `Bearer ${await token()}`},
        //     data: { 
        //         cart: cartState,
        //         customer: customerState,
        //     }
        // })
        dispatch(orderComplete())

        
    }, [])

    return <>
        confirmation
    </>
}