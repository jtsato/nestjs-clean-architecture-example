import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('health-check-live', () => {
        it('should return status "UP"', () => {
            expect(appController.getHealthCheck()).toEqual({ status: 'UP' });
        });
    });

    describe('health-check-ready', () => {
        it('should return status "UP"', () => {
            expect(appController.getReadyCheck()).toEqual({ status: 'UP' });
        });
    });
});
