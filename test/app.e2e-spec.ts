/* eslint-disable jest/expect-expect */
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/health-check/live (GET)', () => request(app.getHttpServer())
        .get('/health-check/live')
        .expect(200)
        .expect({ status: 'UP' }));

    it('/health-check/ready (GET)', () => request(app.getHttpServer())
        .get('/health-check/ready')
        .expect(200)
        .expect({ status: 'UP' }));

    afterAll(async () => {
        await app.close();
    });
});
