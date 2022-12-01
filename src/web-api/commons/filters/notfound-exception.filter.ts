import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
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
        const identifier: string = exception.parameters[0] as unknown as string;
        const message = exception.message.replace(/{}/i, identifier);
        const status: number = HttpStatus.NOT_FOUND;
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
