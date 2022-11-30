/* eslint-disable import/no-cycle */
import { RegisterUserCommandValidator } from '@/core/usecases/register-user';

export class RegisterUserCommand {
    name: string;
    email: string;
    password: string;
    fullname: string;

    constructor(name: string, email: string, password: string, fullname: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        RegisterUserCommandValidator.ValidateAndThrow(this);
    }
}
