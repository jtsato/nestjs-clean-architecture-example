import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { NotFoundException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';
import { II18nService, II18nServiceSymbol } from '@/core/commons';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
    private readonly logger = new Logger(NotFoundExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18nService: II18nService;

    constructor(adapterHost: HttpAdapterHost, @Inject(II18nServiceSymbol) i18nService: II18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18nService = i18nService;
    }

    catch(exception: NotFoundException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status: number = HttpStatus.NOT_FOUND;
        const key = `messages.${exception.message}`;
        const message: string = this.i18nService.format(key, exception.parameters);
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
