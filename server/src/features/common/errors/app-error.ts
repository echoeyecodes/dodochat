export class AppError extends Error {
    public readonly code?: number;

    constructor(name: string, message: string, code?: number) {
        super(message);
        this.name = name;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
