import { User } from '@/core/models';

export interface IGetUserByNameGateway {
    execute(name: string): Promise<User>;
}

export const IGetUserByNameGatewaySymbol = Symbol('IGetUserByNameGateway');
