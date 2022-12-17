import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ResponseStatus } from '@/web-api/commons/models';
import { II18nService, II18nServiceSymbol } from '@/core/commons';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18nService: II18nService;

    constructor(adapterHost: HttpAdapterHost, @Inject(II18nServiceSymbol) i18nService: II18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18nService = i18nService;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        const key = 'messages.common.unexpected.exception';
        const message: string = this.i18nService.translate(key);
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.debug(`Language: ${this.i18nService.lang()}`);
        this.logger.debug(exception.message);
        this.logger.debug(exception.stack);
        this.logger.error(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
