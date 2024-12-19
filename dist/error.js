export class BirError extends Error {
    constructor(message) {
        super(message);
    }
    static assert(response) {
        const { ErrorCode, ErrorMessageEn, ErrorMessagePl } = response;
        if (ErrorCode || ErrorMessageEn || ErrorMessagePl) {
            const message = ErrorMessageEn || ErrorMessagePl || `BIR error code ${ErrorCode}`;
            const error = new BirError(message);
            error.response = response;
            throw error;
        }
    }
}
