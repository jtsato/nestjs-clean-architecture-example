import { CoreException } from '@/core/exceptions';

export class ValidationException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = ValidationException.name;
    }
}
