import { User } from '@/core/models';

export interface RegisterUserGateway {
    execute(user: User): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RegisterUserGateway = Symbol('RegisterUserGateway');
