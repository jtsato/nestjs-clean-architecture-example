import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('AppController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('GET /health-check/live', () => {
        it('should return status 200 OK with "UP" in the response body.', async () => {
            // Arrange
            // Act
            const response = await request(app.getHttpServer())
                .get('/health-check/live')
                .set('Content-Type', 'application/json');

            // Assert
            expect(response.body).toEqual({ status: 'UP' });
        });
    });

    describe('GET /health-check/ready', () => {
        it('should return status 200 OK with "UP" in the response body.', async () => {
            // Arrange
            // Act
            const response = await request(app.getHttpServer())
                .get('/health-check/ready')
                .set('Content-Type', 'application/json');

            // Assert
            expect(response.body).toEqual({ status: 'UP' });
        });
    });
});
