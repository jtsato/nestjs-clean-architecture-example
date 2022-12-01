import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getLive(): string {
        return JSON.stringify({ status: 'UP' });
    }

    getReady(): string {
        return JSON.stringify({ status: 'UP' });
    }
}
