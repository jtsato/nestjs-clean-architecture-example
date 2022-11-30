export class CoreException implements Error {
    name: string;
    message: string;
    stack?: string;

    public Parameters: any[];

    constructor(message: string, parameters: any[]) {
        this.message = message;
        this.Parameters = parameters;
    }
}
