import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { ResponseStatus } from '@/web-api/commons/models';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18n: I18nService;

    constructor(adapterHost: HttpAdapterHost, i18n: I18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18n = i18n;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        const key = 'messages.common.unexpected.exception';
        const message: string = this.i18n.translate(key);
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.error(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
