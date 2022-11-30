import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ResponseStatus } from '@/web-api/commons/models';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        const body: ResponseStatus = new ResponseStatus(status, 'common.unexpected.exception', []);
        this.logger.error(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
