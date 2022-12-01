import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ValidationException } from '@/core/exceptions';
import { Field, ResponseStatus } from '@/web-api/commons/models';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter<ValidationException> {
    private readonly logger = new Logger(ValidationExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: ValidationException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const command: object = exception.parameters[0] as object;
        const errors: object = exception.parameters[1] as object;
        const fields: Array<Field> = new Array<Field>();
        Object.keys(errors).forEach((key) => {
            const error: string = errors[key] as string;
            const value: string = command[key] as string;
            const field: Field = new Field(key, error, value);
            fields.push(field);
        });
        const status: number = HttpStatus.BAD_REQUEST;
        const body: ResponseStatus = new ResponseStatus(status, exception.message, fields);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(context.getResponse(), body, status);
    }
}
