interface ICustomer {
    name: string,
    phone: string,
    address: IAddress,
    reward: IReward,
}

interface IReward {
    points: number,
    transactions: IRewardTransaction[]
}

interface IRewardTransaction {
    type: 'reward' | 'redeem' | 'refund' | 'cancel',  // 'reward', 
    amount: number,
    order_id: string, 
    created_at: number,
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
