interface ICustomer {
    name: string,
    phone: number,
    phone_list: number[],
    address: IAddress,
    billings: IBillings,
}

interface IAddress {
    address: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    delivery_fee: number,
}

interface IBillings {
    customer_id: string,
    cards: ICard[]
}

interface ICard {
    id: string, 
    card_type: string,
    card_brand: string,
    cardholder_name: string,
    exp_month: number,
    exp_year: number,
    last_4: string,
    billing_address: {
        address: string,
        city: string,
        state: string,
        postal_code: string,
        country: string,
    }
}