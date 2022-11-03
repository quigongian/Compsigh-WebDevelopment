import { HttpStatus } from "./HttpStatus";

export class HttpError extends Error {
    public readonly statusCode: HttpStatus;

    constructor(statusCode: HttpStatus, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}
