/* istanbul ignore file */

import { User } from '@/core/models';
import { GetUserByNameQuery } from '@/core/usecases/get-user-by-name';

export interface IGetUserByNameUseCase {
    execute(query: GetUserByNameQuery): Promise<User>;
}

export const IGetUserByNameUseCaseSymbol = Symbol('IGetUserByNameUseCase');
