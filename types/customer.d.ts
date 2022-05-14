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

interface IGoogleAddress {
    street_number: string,
    route: string,
    locality: string,
    administrative_area_level_1: string,
    postal_code: string,
}

interface ICalcDelivFee {
    address: IGoogleAddress,
    format_address: string,
    place_id: string,
}

interface ISentCode {
    phone: string,
    phone_list: string[],
    handleStartLoading: () => void
}

interface IPublicPaymentMethod {
    card: {
        brand: string,
        exp_month: number,
        exp_year: number,
        last_four: string
    },
    id: string
}
