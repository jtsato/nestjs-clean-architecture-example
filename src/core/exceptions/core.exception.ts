export class CoreException extends Error {
    public Parameters: any[];

    constructor(message: string, parameters: any[]) {
        super(message);
        this.message = message;
        this.Parameters = parameters;
    }
}
