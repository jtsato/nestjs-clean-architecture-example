import { CoreException } from './core.exception';

export class ValidationException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = ValidationException.name;
    }
}
