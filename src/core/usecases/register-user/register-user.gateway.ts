import { User } from '@/core/models';

export interface IRegisterUserGateway {
    execute(user: User): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const IRegisterUserGateway = Symbol('IRegisterUserGateway');
