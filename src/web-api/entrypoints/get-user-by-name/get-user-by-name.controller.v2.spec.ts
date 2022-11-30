/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jest/expect-expect */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { NotFoundException, ValidationException } from '@/core/exceptions';
import { GetUserByNameQuery, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { User } from '@/core/models';
import { dataObjectMatcher } from '~/test/helpers';

const usecase: MockProxy<IGetUserByNameUseCase> = mock<IGetUserByNameUseCase>();

describe('GET /users/by-name', () => {
    let app: INestApplication;

    beforeEach(async () => {
        mockReset(usecase);

        const moduleRef = await Test.createTestingModule({
            imports: [GetUserByNameModule],
        })
            .overrideProvider(IGetUserByNameUseCase)
            .useValue(usecase)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('should return 400 BadRequest when query parameter is empty', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new GetUserByNameQuery('unknown')))
            .mockRejectedValue(new ValidationException('common.validation.alert', [{ name: '' }, { name: 'validation.user.name.blank' }]));

        // Act
        const response = await request(app.getHttpServer())
            .get('/users/by-name?name=unknown');

        // Assert
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 400,
            message: 'common.validation.alert',
            fields: [
                { name: 'name', message: 'validation.user.name.blank', value: '' },
            ],
        });
    });

    it('should return 404 NotFound when user is not registered', async () => {
        // Arrange
        usecase
            .execute
            .calledWith(dataObjectMatcher(new GetUserByNameQuery('unknown')))
            .mockRejectedValue(new NotFoundException('validation.user.name.not.found {}', ['unknown']));

        // Act
        const response = await request(app.getHttpServer())
            .get('/users/by-name?name=unknown');

        // Assert
        expect(response.status).toBe(HttpStatus.NOT_FOUND);
        expect(response.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toEqual({
            code: 404,
            message: 'validation.user.name.not.found unknown',
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

    afterAll(async () => {
        await app.close();
    });
});
