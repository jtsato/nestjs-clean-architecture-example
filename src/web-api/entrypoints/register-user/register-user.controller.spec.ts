import { anyObject, mock, MockProxy, mockReset } from 'jest-mock-extended';
/* eslint-disable sonarjs/no-duplicate-string */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { dataObjectMatcher } from '~/test/helpers';
import { User } from '@/core/models';
import { IRegisterUserUseCase, IRegisterUserUseCaseSymbol, RegisterUserCommand } from '@/core/usecases/register-user';
import { CoreException, UniqueConstraintException } from '@/core/exceptions';
import { RegisterUserModule } from '@/web-api/entrypoints/register-user/register-user.module';

const usecase: MockProxy<IRegisterUserUseCase> = mock<IRegisterUserUseCase>();

describe('POST /users', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [RegisterUserModule],
        })
            .overrideProvider(IRegisterUserUseCaseSymbol)
            .useValue(usecase)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(() => {
        mockReset(usecase);
    });

    it('should return 500 Internal Server Error when an unexpected error occurs', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(anyObject())
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
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An unexpected error has occurred, please try again later!',
            fields: [],
        });
    });

    it('should return 400 BadRequest when request parameter is invalid', async () => {
        // Arrange
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
            message: 'Please correct the errors and try again.',
            fields: [
                { name: 'name', message: 'The user name is required.', value: '' },
                { name: 'email', message: 'The user email is required.', value: '' },
                { name: 'password', message: 'The user password is required.', value: '' },
                { name: 'fullname', message: 'The user fullname is required.', value: '' },
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
            .mockRejectedValue(new UniqueConstraintException('validation.user.name.duplicated', ['jszero']));

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
            code: HttpStatus.BAD_REQUEST,
            message: 'There is already a user named jszero registered.',
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
                new Date('2022-12-27 00:00:00'),
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
