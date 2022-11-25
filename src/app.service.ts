import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getLive(): string {
        return 'UP';
    }

    getReady(): string {
        return 'UP';
    }
}
