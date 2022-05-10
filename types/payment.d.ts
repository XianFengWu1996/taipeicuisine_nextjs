interface IPayWithMethodId {
    card: IPublicPaymentMethod,
    cart: ICartState, 
    customer: ICustomerState,
}

interface IPayWithIntent {
    future_use: boolean,
    stripe: Stripe,
    elements: StripeElements,
    cart: ICartState, 
    customer: ICustomerState,
    is_new: boolean,
}