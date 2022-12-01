/* eslint-disable sonarjs/no-duplicate-string */
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { CatchExceptionHelper, dataObjectMatcher } from '~/test/helpers';
import { HttpResponse } from '@/web-api/commons/models';
import { UserResponse } from '@/web-api/xcutting';
import { RegisterUserController, RegisterUserRequest } from '@/web-api/entrypoints/register-user';
import { ValidationException } from '@/core/exceptions';
import { User } from '@/core/models';
import { IRegisterUserUseCase, RegisterUserCommand } from '@/core/usecases/register-user';

const usecase: MockProxy<IRegisterUserUseCase> = mock<IRegisterUserUseCase>();

describe('RegisterUserController', () => {
    let controller: RegisterUserController;

    beforeEach(async () => {
        mockReset(usecase);
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RegisterUserController],
            providers: [
                {
                    provide: IRegisterUserUseCase,
                    useValue: usecase,
                },
            ],
        }).compile();

        controller = app.get<RegisterUserController>(RegisterUserController);
    });

    it('should return 400 BadRequest when request parameter is invalid', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(
                {
                    name: '',
                    email: '',
                    password: '',
                    fullname: '',
                },
            ))
            .mockRejectedValue(new ValidationException(
                'common.validation.alert',
                [
                    {
                        name: '',
                        email: '',
                        password: '',
                        fullname: '',
                    },
                    {
                        name: 'validation.user.name.blank',
                        email: 'validation.user.email.blank',
                        password: 'validation.user.password.blank',
                        fullname: 'validation.user.fullname.blank',
                    },

                ],
            ));

        // Act
        const exception: ValidationException = await CatchExceptionHelper
            .catchAsync(() => controller.execute(new RegisterUserRequest('', '', '', '')));

        // Assert
        expect(exception).not.toBeNull();
        expect(exception.message).toBe('common.validation.alert');
        expect(exception.parameters).not.toBeNull();
        expect(exception.parameters.length).toBe(2);
        expect(exception.parameters[0]).toEqual({ email: '', fullname: '', name: '', password: '' });
        expect(exception.parameters[1]).toEqual(
            {
                email: 'validation.user.email.blank',
                fullname: 'validation.user.fullname.blank',
                name: 'validation.user.name.blank',
                password: 'validation.user.password.blank',
            },
        );
    });

    it('should return 400 BadRequest when user is already registered', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new RegisterUserCommand(
                'jszero',
                'john.smith.zero@xyz.com',
                'P@ssw0rd',
                'John Smith Zero',
            )))
            .mockRejectedValue(new ValidationException('validation.user.name.duplicated {}', ['jszero']));

        // Act
        const exception: ValidationException = await CatchExceptionHelper
            .catchAsync(() => controller.execute(new RegisterUserRequest('jszero', 'john.smith.zero@xyz.com', 'P@ssw0rd', 'John Smith Zero')));

        // Assert
        expect(exception).not.toBeNull();
        expect(exception.message).toBe('validation.user.name.duplicated {}');
        expect(exception.parameters).not.toBeNull();
        expect(exception.parameters.length).toBe(1);
        expect(exception.parameters[0]).toEqual('jszero');
    });

    describe('execute()', () => {
        it('should return 201 Created with Body when the user is successfully registered', async () => {
            // Arrange
            usecase
                .execute
                .calledWith(dataObjectMatcher(new RegisterUserCommand(
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                )))
                .mockResolvedValue(new User(
                    1,
                    'jszero',
                    'john.smith.zero@xyz.com',
                    'P@ssw0rd',
                    'John Smith Zero',
                    new Date(2022, 11, 27, 0, 0, 0),
                ));

            const request = new RegisterUserRequest(
                'jszero',
                'john.smith.zero@xyz.com',
                'P@ssw0rd',
                'John Smith Zero',
            );

            // Act
            const response = await controller.execute(request);

            // Assert
            expect(response).not.toBeNull();
            expect(response).toBeInstanceOf(HttpResponse);

            const user = response.body as UserResponse;

            const expected = {
                id: 1,
                name: 'jszero',
                email: 'john.smith.zero@xyz.com',
                password: 'P@ssw0rd',
                fullname: 'John Smith Zero',
                createdAt: '2022-12-27 00:00:00',
            };

            expect(JSON.stringify(user)).toBe(JSON.stringify(expected));
        });
    });
});
