import { Injectable } from '@nestjs/common';
import { IGetDateTimeService } from '@/core/common';

@Injectable()
export class GetDateTimeService implements IGetDateTimeService {
    now(): Date {
        return new Date();
    }
}
