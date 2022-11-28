import { CoreException } from '@/core/exceptions';

export class UniqueConstraintException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = UniqueConstraintException.name;
    }
}
