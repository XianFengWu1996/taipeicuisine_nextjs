interface IPublicOrder {
    order_id: string, 
    user: {
        name: string,
        phone: string,
    },
    items: ICartItem[] ,
    summary: {
        discount: {
            lunch_discount: number,
            point_discount: number,
        },
        subtotal: number,
        original_subtotal: number, // need to use this to recalculate the total if we remove lunch discount
        tax: number,
        tip: number,
        tip_type: string,
        delivery_fee: number, 
        total: number,
        refund: {
            amount: number,
            refund_reason: string,
        }
    },
    delivery: {
        is_delivery: boolean,
        address: IAddress | null,
    },
    additional_request: {
        dont_include_utensils: boolean,
        comments: string,
        schedule_time: string,
    }
    payment: {
        payment_type: string,
        card: {
            brand: string, 
            exp_month: number,
            exp_year: number,
            last_4: string,
            country: string,
        }
    },
    date: {
        month: number,
        day: number,
        year: number,
    },
    points: {
        reward: number,
        point_redemption: number,
    },
    created_at: number
}