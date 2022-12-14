import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { UniqueConstraintException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';
import { MessageFormatterHelper } from './message-formatter.helper';

@Catch(UniqueConstraintException)
export class UniqueConstraintExceptionFilter implements ExceptionFilter<UniqueConstraintException> {
    private readonly logger = new Logger(UniqueConstraintException.name);
    private readonly httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: UniqueConstraintException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response = context.getResponse<Response>();
        const key = `messages.${exception.message}`;
        const message: string = MessageFormatterHelper.format(key, exception.parameters);
        const status: number = HttpStatus.BAD_REQUEST;
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
