// CUSTOM ERROR FOR NOT AUTHORIZE 
export class NotAuthorizeError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ? msg : 'Not authorized';
        this.name = 'NotAuthorizeError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isNotAuthError = (error: Error) => {
    return error.name === 'NotAuthorizeError'
}

// CUSTOM ERROR FOR NOT AUTHORIZE 
export class AccountNotAuthWithRedirectError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ? msg : 'Not authorized';
        this.name = 'AccountNotAuthWithRedirectError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isAccountNotAuthWithRedirectError = (error: Error) => {
    return error.name === 'AccountNotAuthWithRedirectError'
}