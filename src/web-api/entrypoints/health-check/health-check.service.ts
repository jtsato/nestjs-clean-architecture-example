import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
    getLive(): object {
        return { status: 'UP' };
    }

    getReady(): object {
        return { status: 'UP' };
    }
}
