export interface IGetDateTimeService {
    now(): Date;
}

export const IGetDateTimeSymbol = Symbol('IGetDateTimeService');
