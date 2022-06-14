// NO TOKEN FOUND ERROR
export class NoTokenFoundError extends Error{
    constructor(msg?: string){
        super(msg);

        this.message = msg ? msg : 'No Token Found';
        this.name = 'NoTokenFoundError';
    }
}

// CHECK IF THE ERROR IS AN UNAUTHORIZE ERROR
export const isNoTokenFoundError = (error: Error) => {
    return error.name === 'NoTokenFoundError'
}