
//TIP
interface ITipButtonProps {
    value: string,
    tip_type: string,
    handleOnClick: () => void,
}

interface ICustomTipButtonProps {
    tip_type: string,
    clearValue: () => void,
    clearFocus: () =>  void,
    inputRef: Ref<any> | undefined
}


// PHONE 
interface IPhoneCardProps {
    phone_num: string,
    isSelected: boolean,
    handlePhoneSelect: (arg: string) => void,
    handlePhoneRemove: (arg: string) => void 
}

// Summary Items
interface IPriceDisplayProps {
    title: string,
    value: number,
}

// Order
interface IOrderResult {
    order_id: string,
    order_time: string,
    item_count: number,
    estimate: number,
    total: number,
}