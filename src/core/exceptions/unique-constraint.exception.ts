import { CoreException } from './core.exception';

export class UniqueConstraintException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = UniqueConstraintException.name;
    }
}
