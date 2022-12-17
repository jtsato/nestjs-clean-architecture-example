/* istanbul ignore file */

export interface IGetDateTimeService {
    now(): Date;
}

export const IGetDateTimeServiceSymbol = Symbol('IGetDateTimeService');
