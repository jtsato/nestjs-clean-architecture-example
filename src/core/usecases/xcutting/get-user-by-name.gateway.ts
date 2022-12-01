import { User } from '@/core/models';

export interface IGetUserByNameGateway {
    execute(name: string): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const IGetUserByNameGateway = Symbol('IGetUserByNameGateway');
