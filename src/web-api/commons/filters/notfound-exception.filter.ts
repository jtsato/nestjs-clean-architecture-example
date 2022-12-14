import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { I18nContext } from 'nestjs-i18n';
import { NotFoundException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
    private readonly logger = new Logger(NotFoundExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
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
        let message: string = I18nContext.current().translate(key);
        for (let index = 0; index < parameters.length; index += 1) {
            const parameter: string = parameters[index] as unknown as string;
            message = message.replace(`{${index}}`, parameter);
        }

        return message;
    }
}
