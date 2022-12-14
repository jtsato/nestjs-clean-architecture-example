export class CoreException extends Error {
    public parameters: Array<any>;

    constructor(message: string, parameters: Array<any>) {
        super(message);
        this.message = message;
        this.parameters = parameters;
    }
}
