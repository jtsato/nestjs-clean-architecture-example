import { GetUserByNameQueryValidator } from '@/core/usecases/get-user-by-name';

export class GetUserByNameQuery {
    name: string;

    constructor(name: string) {
        this.name = name;
        GetUserByNameQueryValidator.ValidateAndThrow(this);
    }
}
