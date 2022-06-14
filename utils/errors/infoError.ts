// CUSTOM ERROR FOR NOT AUTHORIZE 
export class InfoError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ?? '';
        this.name = 'InfoError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isInfoError = (error: Error) => {
    return error.name === 'InfoError'
}