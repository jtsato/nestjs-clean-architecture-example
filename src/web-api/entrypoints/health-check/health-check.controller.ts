import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheckService } from './health-check.service';

@Controller()
export class HealthCheckController {
    constructor(private readonly service: HealthCheckService) { }

    @ApiExcludeEndpoint()
    @Get('/health-check/live')
    getHealthCheck(): object {
        return this.service.getLive();
    }

    @ApiExcludeEndpoint()
    @Get('/health-check/ready')
    getReadyCheck(): object {
        return this.service.getReady();
    }
}
