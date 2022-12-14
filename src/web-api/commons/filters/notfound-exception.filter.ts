import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
    private readonly logger = new Logger(NotFoundExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18n: I18nService;

    constructor(adapterHost: HttpAdapterHost, i18n: I18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18n = i18n;
    }

    catch(exception: NotFoundException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status: number = HttpStatus.NOT_FOUND;
        const key = `messages.${exception.message}`;
        const message: string = this.getErrorMessage(key, exception.parameters);
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }

    private getErrorMessage(key: string, parameters: Array<any>): string {
        let message: string = this.i18n.translate(key);

        for (let index = 0; index < parameters.length; index += 1) {
            const parameter: string = parameters[index] as unknown as string;
            message = message.replace(`{${index}}`, parameter);
        }

        return message;
    }
}
