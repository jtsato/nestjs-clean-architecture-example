/* eslint-disable sonarjs/no-duplicate-string */
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { CatchExceptionHelper, dataObjectMatcher } from '~/test/helpers';
import { IRegisterUserGateway, IRegisterUserUseCase, RegisterUserCommand, RegisterUserUseCase } from '@/core/usecases/register-user';
import { User } from '@/core/models';
import { IGetUserByNameGateway } from '@/core/usecases/xcutting';
import { UniqueConstraintException } from '@/core/exceptions';
import { Optional } from '@/core/commons/optional';
import { IGetDateTimeService } from '@/core/commons';

const getUserByNameGatewayMock: MockProxy<IGetUserByNameGateway> = mock<IGetUserByNameGateway>();
const getDateTimeServiceMock: MockProxy<IGetDateTimeService> = mock<IGetDateTimeService>();
const registerUserGatewayMock: MockProxy<IRegisterUserGateway> = mock<IRegisterUserGateway>();

const usecase: IRegisterUserUseCase = new RegisterUserUseCase(getUserByNameGatewayMock, getDateTimeServiceMock, registerUserGatewayMock);

describe('RegisterUserUseCase', () => {
    beforeEach(() => {
        mockReset(getUserByNameGatewayMock);
        mockReset(getDateTimeServiceMock);
        mockReset(registerUserGatewayMock);
    });

    describe('execute()', () => {
        it('should throw error when username is already registered', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(Optional.of(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                )));

            const command: RegisterUserCommand = new RegisterUserCommand('jszero', 'john.smith.zero@xyz.com', 'P@ssw0rd', 'John Smith Zero');

            // Act
            const exception: UniqueConstraintException = await CatchExceptionHelper.catchAsync(() => usecase.execute(command));

            // Assert
            expect(exception).not.toBeNull();
            expect(exception.message).toBe('validation.user.name.duplicated');
            expect(exception.parameters).not.toBeNull();
            expect(exception.parameters).toHaveLength(1);
            expect(exception.parameters[0]).toBe('jszero');
        });

        it('should run successfully when username is not registered', async () => {
            // Arrange
            getUserByNameGatewayMock
                .execute
                .calledWith('jszero')
                .mockResolvedValue(Optional.empty());

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
