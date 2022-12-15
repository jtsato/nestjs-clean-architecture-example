/* eslint-disable sonarjs/no-duplicate-string */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { dataObjectMatcher } from '~/test/helpers';
import { CoreException, NotFoundException, ValidationException } from '@/core/exceptions';
import { User } from '@/core/models';
import { GetUserByNameQuery, IGetUserByNameUseCase, IGetUserByNameUseCaseSymbol } from '@/core/usecases/get-user-by-name';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';

const usecase: MockProxy<IGetUserByNameUseCase> = mock<IGetUserByNameUseCase>();

describe('GET /users/by-name', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [GetUserByNameModule],
        })
            .overrideProvider(IGetUserByNameUseCaseSymbol)
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
            .calledWith(dataObjectMatcher({ name: 'jszero' }))
            .mockRejectedValue(new CoreException('common.unexpected.exception', []));

        // Act
        const response = await request(app.getHttpServer())
            .get('/users/by-name?name=jszero');

        // Assert
        expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 500,
            message: 'An unexpected error has occurred, please try again later!',
            fields: [],
        });
    });

    it('should return 400 BadRequest when query parameter is empty', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher({ name: '' }))
            .mockRejectedValue(new ValidationException('common.validation.alert', [{ name: '' }, { name: 'validation.user.name.blank' }]));

        // Act
        const response = await request(app.getHttpServer())
            .get('/users/by-name?name=');

        // Assert
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 400,
            message: 'Please correct the errors and try again.',
            fields: [
                { name: 'name', message: 'The user name is required.', value: '' },
            ],
        });
    });

    it('should return 404 NotFound when user is not registered', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new GetUserByNameQuery('jszero')))
            .mockRejectedValue(new NotFoundException('validation.user.name.not.found', ['jszero']));

        // Act
        const response = await request(app.getHttpServer())
            .get('/users/by-name?name=jszero');

        // Assert
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 404,
            message: 'The user named jszero cannot be found.',
            fields: [],
        });
    });

    it('should return 200 Success when user is registered', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new GetUserByNameQuery('jszero')))
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
            .get('/users/by-name?name=jszero');

        // Assert
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            id: 1,
            name: 'jszero',
            email: 'john.smith.zero@xyz.com',
            password: 'P@ssw0rd',
            fullname: 'John Smith Zero',
            createdAt: '2022-12-27 00:00:00',
        });
    });
});
