/* eslint-disable sonarjs/no-duplicate-string */
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { CatchExceptionHelper, dataObjectMatcher } from '~/test/helpers';
import { IRegisterUserUseCase, RegisterUserCommand, RegisterUserGateway, RegisterUserUseCase } from '@/core/usecases/register-user';
import { User } from '@/core/models';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { IGetDateTimeService } from '@/core/common';
import { UniqueConstraintException } from '@/core/exceptions';

const getUserByNameGatewayMock: MockProxy<GetUserByNameGateway> = mock<GetUserByNameGateway>();
const getDateTimeServiceMock: MockProxy<IGetDateTimeService> = mock<IGetDateTimeService>();
const registerUserGatewayMock: MockProxy<RegisterUserGateway> = mock<RegisterUserGateway>();

const usecase: IRegisterUserUseCase = new RegisterUserUseCase(getUserByNameGatewayMock, getDateTimeServiceMock, registerUserGatewayMock);

describe('RegisterUserUseCase', () => {
    beforeEach(() => {
        mockReset(getUserByNameGatewayMock);
        mockReset(registerUserGatewayMock);
    });

    describe('execute()', () => {
        it('should throw error when username is already registered', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                ));

            const command: RegisterUserCommand = new RegisterUserCommand('jszero', 'john.smith.zero@xyz.com', 'P@ssw0rd', 'John Smith Zero');

            // Act
            const exception: UniqueConstraintException = await CatchExceptionHelper.catchAsync(() => usecase.execute(command));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('validation.user.name.duplicated {}');
            expect(exception.Parameters).not.toBeNull();
            expect(exception.Parameters).toHaveLength(1);
            expect(exception.Parameters[0]).toBe('jszero');
        });

        it('should run successfully when username is not registered', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(null);

            getDateTimeServiceMock
                .now
                .mockReturnValue(new Date(2022, 11, 27, 0, 0, 0));

            registerUserGatewayMock
                .execute
                .calledWith(dataObjectMatcher(new User(
                    null,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                )))
                .mockResolvedValue(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                ));

            const command: RegisterUserCommand = new RegisterUserCommand('jszero', 'john.smith.zero@xyz.com', 'P@ssw0rd', 'John Smith Zero');

            // Act
            const user = await usecase.execute(command);

            // Assert
            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(User);
            expect(user.id).toBe(1);
            expect(user.name).toBe('jszero');
            expect(user.email).toBe('john.smith.zero@xyz.com');
            expect(user.password).toBe('P@ssw0rd');
            expect(user.fullname).toBe('John Smith Zero');
            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.createdAt).toEqual(new Date(2022, 11, 27, 0, 0, 0));
        });
    });
});
