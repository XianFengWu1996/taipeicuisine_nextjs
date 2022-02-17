export {};

declare global {
    interface IStore {
        server_is_on: boolean,
        name: string,
        hours: [IHours],
        message: message,
        special_hour: [ISpecial_hour],
        primary_phone_number: string,
        sub_phone_number: [string],
        address: IAddress,
        expiration: number
    }

    interface IAddress {
        street: string,
        city: string,
        state: string,
        zipcode: string,
    }
    
    export interface IHours {
        day_of_week: string,
        open_hour: number,
        close_hour: number,
        open_for_business: boolean
    }
    
    interface ISpecial_hour {
        date: string | number,
        open_hour: number,
        close_hour: number,
        open_for_business: boolean,
    }
        
    interface IMessage {
        payment_message: [string],
        maintenance_message: [string],
        update_message: [string],
        promotion_message: [string],
    }
}