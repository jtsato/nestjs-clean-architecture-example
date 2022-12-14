import { Injectable } from '@nestjs/common';
import { IGetDateTimeService } from './get-date-time-service.interface';

@Injectable()
export class GetDateTimeService implements IGetDateTimeService {
    now(): Date {
        return new Date();
    }
}
