export class CoreException extends Error {
    public parameters: any[];

    constructor(message: string, parameters: any[]) {
        super(message);
        this.message = message;
        this.parameters = parameters;
    }
}
