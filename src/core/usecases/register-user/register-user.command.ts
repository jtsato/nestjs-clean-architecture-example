/* eslint-disable import/no-cycle */
import { RegisterUserCommandValidator } from './register-user.command.validator';

export class RegisterUserCommand {
    name: string;
    email: string;
    password: string;
    fullName: string;

    constructor(name: string, email: string, password: string, fullName: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        RegisterUserCommandValidator.ValidateAndThrow(this);
    }
}
