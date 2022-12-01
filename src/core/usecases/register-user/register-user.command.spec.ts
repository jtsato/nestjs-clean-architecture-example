/* eslint-disable sonarjs/no-duplicate-string */
import { ValidationException } from '@/core/exceptions';
import { RegisterUserCommand } from '@/core/usecases/register-user';
import { CatchExceptionHelper } from '~/test/helpers';

describe('RegisterUserCommand, constructor()', () => {
    it('should throw an error when the command has empty parameters', () => {
        // Arrange
        const errors = {
            name: 'validation.user.name.blank',
            email: 'validation.user.email.blank',
            password: 'validation.user.password.blank',
            fullname: 'validation.user.fullname.blank',
        };

        // Act
        const exception: ValidationException = CatchExceptionHelper
            .catch(() => new RegisterUserCommand('', '', '', ''));

        // Assert
        expect(exception).not.toBeNull();
        expect(exception.message).toBe('common.validation.alert');
        expect(exception.parameters).not.toBeNull();
        expect(exception.parameters).toHaveLength(2);
        expect(exception.parameters[1]).toEqual(errors);
    });

    it('should create command object when the parameters are filled correcly', () => {
        // Arrange
        // Act
        const command: RegisterUserCommand = new RegisterUserCommand('jszero', 'john.smith.zero@xyz.com', 'P@ssw0rd', 'John Smith Zero');

        // Assert
        expect(command).not.toBeNull();
        expect(command.name).toBe('jszero');
        expect(command.email).toBe('john.smith.zero@xyz.com');
        expect(command.password).toBe('P@ssw0rd');
        expect(command.fullname).toBe('John Smith Zero');
    });
});
