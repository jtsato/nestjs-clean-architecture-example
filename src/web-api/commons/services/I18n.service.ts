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
        parameters.forEach((element: string, index: number) => {
            message = message.replace(`{${index}}`, element);
        });
        return message;
    }
}
