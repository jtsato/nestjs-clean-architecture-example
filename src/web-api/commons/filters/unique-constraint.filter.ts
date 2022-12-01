import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { UniqueConstraintException } from '@/core/exceptions';
import { ResponseStatus } from '@/web-api/commons/models';

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

        // TODO: Use the message as key to get the message from the resource file.
        let { message } = exception;
        exception.parameters.forEach((parameter) => {
            message = message.replace(/{}/i, parameter as unknown as string);
        });

        const status: number = HttpStatus.BAD_REQUEST;
        const body: ResponseStatus = new ResponseStatus(status, message, []);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(response, body, status);
    }
}
