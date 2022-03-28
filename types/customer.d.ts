interface ICustomer {
    name: string,
    phone: string,
    phone_list: string[],
    address: IAddress,
    reward: {
        points: number,
    },
}

interface IAddress {
    address: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    business: string,
    apt: string,
    delivery_fee: number,
}
