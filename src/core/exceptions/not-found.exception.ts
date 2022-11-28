import { CoreException } from './core.exception';

export class NotFoundException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = NotFoundException.name;
    }
}
