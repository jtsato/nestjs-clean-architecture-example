import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

@Module({
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class HealthCheckModule { }
