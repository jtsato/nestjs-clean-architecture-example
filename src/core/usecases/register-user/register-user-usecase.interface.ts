import { User } from '@/core/models';
import { RegisterUserCommand } from '@/core/usecases/register-user';

export interface IRegisterUserUseCase {
    execute(command: RegisterUserCommand): Promise<User>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const IRegisterUserUseCase = Symbol('IRegisterUserUseCase');
