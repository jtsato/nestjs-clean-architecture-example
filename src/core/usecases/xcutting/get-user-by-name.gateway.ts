import { User } from '@/core/models';

export interface GetUserByNameGateway {
    execute(name: string): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetUserByNameGateway = Symbol('GetUserByNameGateway');
