import { BadRequestException } from '@nestjs/common';

export class CoreException extends BadRequestException implements Error {
    name: string;
    message: string;
    stack?: string;

    public Parameters: any[];

    constructor(message: string, parameters: any[]) {
        super(message);
        this.message = message;
        this.Parameters = parameters;
    }
}
