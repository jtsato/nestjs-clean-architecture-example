import { I18nContext } from 'nestjs-i18n';

export class MessageFormatterHelper {
    static format(messageKey: string, parameters: Array<any>): string {
        let message: string = I18nContext.current().translate(messageKey);

        for (let index = 0; index < parameters.length; index += 1) {
            const parameter: string = parameters[index] as unknown as string;
            message = message.replace(`{${index}}`, parameter);
        }

        return message;
    }
}
