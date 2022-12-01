import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getLive(): object {
        return { status: 'UP' };
    }

    getReady(): object {
        return { status: 'UP' };
    }
}
