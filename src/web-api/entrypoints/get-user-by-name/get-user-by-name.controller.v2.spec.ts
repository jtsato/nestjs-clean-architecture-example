/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jest/expect-expect */
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { MockProxy, mock, mockReset } from 'jest-mock-extended';
import { INestApplication } from '@nestjs/common';
import { NotFoundException, ValidationException } from '@/core/exceptions';
import { GetUserByNameQuery, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { User } from '@/core/models';
import { dataObjectMatcher } from '~/test/helpers';

const usecase: MockProxy<IGetUserByNameUseCase> = mock<IGetUserByNameUseCase>();

describe('GetUserByNameController', () => {
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

    describe('execute()', () => {
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
            // Assert
            return request(app.getHttpServer())
                .get('/users/by-name?name=jszero')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect({
                    id: 1,
                    name: 'jszero',
                    email: 'john.smith.zero@xyz.com',
                    password: 'P@ssw0rd',
                    fullName: 'John Smith Zero',
                    createdAt: '2022-12-27 00:00:00',
                });
        });

        it('should return 404 NotFound when user is not registered', async () => {
            // Arrange
            usecase
                .execute
                .calledWith(dataObjectMatcher(new GetUserByNameQuery('unknown')))
                .mockRejectedValue(new NotFoundException('validation.user.name.not.found {}', ['unknown']));

            // Act
            // Assert
            return request(app.getHttpServer())
                .get('/users/by-name?name=unknown')
                .expect(404)
                .expect('Content-Type', /json/)
                .expect({
                    code: 404,
                    message: 'validation.user.name.not.found unknown',
                    fields: [],
                });
        });

        it('should return 400 BadRequest when query parameter is empty', async () => {
            // Arrange
            usecase
                .execute
                .calledWith(dataObjectMatcher(new GetUserByNameQuery('unknown')))
                .mockRejectedValue(new ValidationException('common.validation.alert', [{ name: '' }, { name: 'validation.user.name.blank' }]));

            // Act
            // Assert
            return request(app.getHttpServer())
                .get('/users/by-name?name=unknown')
                .expect(400)
                .expect('Content-Type', /json/)
                .expect({
                    code: 400,
                    message: 'common.validation.alert',
                    fields: [
                        { name: 'name', message: 'validation.user.name.blank', value: '' },
                    ],
                });
        });

        afterAll(async () => {
            await app.close();
        });
    });
});
