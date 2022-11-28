import { CoreException } from '@/core/exceptions';

export class NotFoundException extends CoreException {
    constructor(message: string, parameters: any[]) {
        super(message, parameters);
        this.name = NotFoundException.name;
    }
}
