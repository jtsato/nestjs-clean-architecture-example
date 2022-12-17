import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { UniqueConstraintException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';
import { II18nService, II18nServiceSymbol } from '@/core/commons';

@Catch(UniqueConstraintException)
export class UniqueConstraintExceptionFilter implements ExceptionFilter<UniqueConstraintException> {
    private readonly logger = new Logger(UniqueConstraintException.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18nService: II18nService;

    constructor(adapterHost: HttpAdapterHost, @Inject(II18nServiceSymbol) i18nService: II18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18nService = i18nService;
    }

    catch(exception: UniqueConstraintException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response = context.getResponse<Response>();
        const key = `messages.${exception.message}`;
        const message: string = this.i18nService.format(key, exception.parameters);
        const status: number = HttpStatus.BAD_REQUEST;
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
