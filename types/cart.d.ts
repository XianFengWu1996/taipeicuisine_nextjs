
// Define a type for the slice state
interface ICartState {
    order_id: string
    cart: ICartItem[],
    cart_quantity: number,
    original_subtotal:number,
    subtotal: number,
    delivery_fee: number,
    tip: number,
    tax: number,
    total: number,

    point_redemption: number,
    lunch_discount: number,

    is_delivery: boolean,
    tip_type: string,
    payment_type: IPaymentType,
    comments: string, 
    dont_include_utensils: boolean,
    schedule_time: string,
}

interface ICartItem {
    id: string,
    dish: IDish,
    option: IVarirantOption | null,
    comment: string | null,
    quantity: number,
    total: number,
    lunchOption: ILunchOption | null,
    customize: ICustomize | null
}

interface ICustomizeItem {
    id: string,
    en_name: string,
    ch_name: string,
    price: number,
}

interface ICustomize {
    protein: ICustomizeItem[],
    veggie: ICustomizeItem[],
    total: number,
}

interface ILunchOption {
    sub: boolean,
    no_soup: boolean,
    no_rice: boolean,
}

type IPaymentType = '' | 'online' | 'instore' | 'cash'

