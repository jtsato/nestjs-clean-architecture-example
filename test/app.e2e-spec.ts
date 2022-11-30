/* eslint-disable jest/expect-expect */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/health-check/live (GET)', () => request(app.getHttpServer())
        .get('/health-check/live')
        .expect(200)
        .expect('UP'));

    it('/health-check/ready (GET)', () => request(app.getHttpServer())
        .get('/health-check/ready')
        .expect(200)
        .expect('UP'));
});
