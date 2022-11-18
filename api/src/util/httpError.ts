import { HttpStatus } from "./HttpStatus";

export class HttpError extends Error {
    public readonly code: HttpStatus;

    constructor(code: HttpStatus, message: string) {
        super(message);
        this.code = code;
    }
}
