import { User } from '@/core/models';

export interface IRegisterUserGateway {
    execute(user: User): Promise<User>;
}

export const IRegisterUserGatewaySymbol = Symbol('IRegisterUserGateway');
