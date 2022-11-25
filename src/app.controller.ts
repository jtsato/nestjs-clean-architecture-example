import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/health-check/live')
    getHealthCheck(): string {
        return this.appService.getLive();
    }

    @Get('/health-check/ready')
    getReadyCheck(): string {
        return this.appService.getReady();
    }
}
