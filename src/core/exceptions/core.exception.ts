import { BadRequestException } from '@nestjs/common';

export class CoreException extends BadRequestException {
    public Parameters: any[];

    constructor(message: string, parameters: any[]) {
        super(message);
        this.Parameters = parameters;
    }
}
