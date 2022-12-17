import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { II18nService } from '@/core/commons';

@Injectable()
export class I18nService implements II18nService {
    lang(): string {
        return I18nContext.current().lang;
    }

    translate(key: string): string {
        return I18nContext.current().translate(key);
    }

    format(key: string, parameters: any[]): string {
        let message: string = I18nContext.current().translate(key);

        for (let index = 0; index < parameters.length; index += 1) {
            const parameter: string = parameters[index] as unknown as string;
            message = message.replace(`{${index}}`, parameter);
        }

        return message;
    }
}
