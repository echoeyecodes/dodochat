class ErrorBody extends Error {
    message: string;
    code?: number;
    other?: unknown;

    constructor(code: number, message: string, name: string, other?: unknown) {
        super();
        this.message = message;
        this.code = code;
        this.name = name;
        this.other = other;
    }
}

export default ErrorBody;
