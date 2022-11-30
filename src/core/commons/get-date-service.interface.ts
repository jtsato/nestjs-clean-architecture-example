export interface IGetDateTimeService {
    now(): Date;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const IGetDateTimeService = Symbol('IGetDateTimeService');
