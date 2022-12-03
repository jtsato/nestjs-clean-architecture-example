import { User } from '@/core/models';
import { RegisterUserCommand } from '@/core/usecases/register-user';

export interface IRegisterUserUseCase {
    execute(command: RegisterUserCommand): Promise<User>;
}

export const IRegisterUserUseCaseSymbol = Symbol('IRegisterUserUseCase');
