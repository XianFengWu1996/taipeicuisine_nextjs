interface ICustomer {
    name: string,
    phone: string,
    phone_list: string[],
    address: IAddress,
    reward: {
        points: number,
    },
}

interface ICustomerState extends ICustomer{
    // handle dialog open / close status
    loginDialogOpen: boolean,
    smsDialogOpen: boolean, 
  
    //  handle loading status 
    customerSaveLoading: boolean, 
    customerCardLoading: boolean,
  
    // handle collapse open / close status
    customerCollapse: boolean,
    addressCollapse: boolean,
    showSkeleton: boolean,
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

interface IPublicPaymentMethod {
    card: {
        brand: string,
        exp_month: number,
        exp_year: number,
        last_four: string
    },
    id: string
}
