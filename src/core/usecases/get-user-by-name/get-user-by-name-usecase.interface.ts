import { User } from '@/core/models';
import { GetUserByNameQuery } from '@/core/usecases/get-user-by-name';

export interface IGetUserByNameUseCase {
    execute(query: GetUserByNameQuery): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const IGetUserByNameUseCase = Symbol('IGetUserByNameUseCase');
