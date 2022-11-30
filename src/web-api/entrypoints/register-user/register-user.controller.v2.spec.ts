/* eslint-disable sonarjs/no-duplicate-string */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { dataObjectMatcher } from '~/test/helpers';
import { User } from '@/core/models';
import { IRegisterUserUseCase, RegisterUserCommand } from '@/core/usecases/register-user';
import { CoreException, UniqueConstraintException, ValidationException } from '@/core/exceptions';
import { RegisterUserModule } from '@/web-api/entrypoints/register-user/register-user.module';

const usecase: MockProxy<IRegisterUserUseCase> = mock<IRegisterUserUseCase>();

describe('POST /users', () => {
    let app: INestApplication;

    beforeEach(async () => {
        mockReset(usecase);

        const moduleRef = await Test.createTestingModule({
            imports: [RegisterUserModule],
        })
            .overrideProvider(IRegisterUserUseCase)
            .useValue(usecase)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('should return 500 Internal Server Error when an unexpected error occurs', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new RegisterUserCommand(
                'jszero',
                'john.smith.zero@xyz.com',
                'P@ssw0rd',
                'John Smith Zero',
            )))
            .mockRejectedValue(new CoreException('common.unexpected.exception', []));

        // Act
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(
                {
                    name: 'jszero',
                    email: 'john.smith.zero@xyz.com',
                    password: 'P@ssw0rd',
                    fullname: 'John Smith Zero',
                },
            );

        // Assert
        expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 500,
            message: 'common.unexpected.exception',
            fields: [],
        });
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
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(
                {
                    name: '',
                    email: '',
                    password: '',
                    fullname: '',
                },
            );

        // Assert
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 400,
            message: 'common.validation.alert',
            fields: [
                { name: 'name', message: 'validation.user.name.blank', value: '' },
                { name: 'email', message: 'validation.user.email.blank', value: '' },
                { name: 'password', message: 'validation.user.password.blank', value: '' },
                { name: 'fullname', message: 'validation.user.fullname.blank', value: '' },
            ],
        });
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
            .mockRejectedValue(new UniqueConstraintException('validation.user.name.duplicated {}', ['jszero']));

        // Act
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(
                {
                    name: 'jszero',
                    email: 'john.smith.zero@xyz.com',
                    password: 'P@ssw0rd',
                    fullname: 'John Smith Zero',
                },
            );

        // Assert
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 400,
            message: 'validation.user.name.duplicated jszero',
            fields: [],
        });
    });

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

        // Act
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(
                {
                    name: 'jszero',
                    email: 'john.smith.zero@xyz.com',
                    password: 'P@ssw0rd',
                    fullname: 'John Smith Zero',
                },
            );

        // Assert
        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.header).toHaveProperty('location', '/users/by-name?name=jszero');
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual(
            {
                id: 1,
                name: 'jszero',
                email: 'john.smith.zero@xyz.com',
                password: 'P@ssw0rd',
                fullname: 'John Smith Zero',
                createdAt: '2022-12-27 00:00:00',
            },
        );
    });
});
