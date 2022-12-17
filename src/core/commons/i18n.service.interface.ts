/* istanbul ignore file */

export interface II18nService {
    lang(): string;
    translate(key: string): string;
    format(key: string, parameters: Array<any>): string
}

export const II18nServiceSymbol = Symbol('II18nService');
