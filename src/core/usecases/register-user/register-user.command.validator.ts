/* eslint-disable import/no-cycle */
import { Validator } from 'fluentvalidation-ts';
import { ValidationException } from '@/core/exceptions';
import { RegisterUserCommand } from '@/core/usecases/register-user';

export class RegisterUserCommandValidator extends Validator<RegisterUserCommand> {
    private static instance: RegisterUserCommandValidator;

    constructor() {
        super();

        this.ruleFor('name')
            .notNull()
            .withMessage('validation.user.name.blank')
            .notEmpty()
            .withMessage('validation.user.name.blank');

        this.ruleFor('email')
            .notNull()
            .withMessage('validation.user.email.blank')
            .notEmpty()
            .withMessage('validation.user.email.blank')
            .emailAddress()
            .withMessage('validation.user.email.invalid');

        this.ruleFor('password')
            .notNull()
            .withMessage('validation.user.password.blank')
            .notEmpty()
            .withMessage('validation.user.password.blank');

        this.ruleFor('fullname')
            .notNull()
            .withMessage('validation.user.fullname.blank')
            .notEmpty()
            .withMessage('validation.user.fullname.blank');
    }

    private static getInstance(): RegisterUserCommandValidator {
        if (!RegisterUserCommandValidator.instance) {
            RegisterUserCommandValidator.instance = new RegisterUserCommandValidator();
        }
        return RegisterUserCommandValidator.instance;
    }

    public static ValidateAndThrow(command: RegisterUserCommand): void {
        const instance = RegisterUserCommandValidator.getInstance();
        const errors = instance.validate(command);
        if ((Object.keys(errors).length === 0)) { return; }
        throw new ValidationException('common.validation.alert', [command, errors]);
    }
}
