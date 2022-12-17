import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ValidationException } from '@/core/exceptions';
import { Field, ResponseStatus } from '@/web-api/commons/models';
import { II18nService, II18nServiceSymbol } from '@/core/commons';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter<ValidationException> {
    private readonly logger = new Logger(ValidationExceptionFilter.name);
    private readonly httpAdapter: AbstractHttpAdapter;
    private readonly i18nService: II18nService;

    constructor(adapterHost: HttpAdapterHost, @Inject(II18nServiceSymbol) i18nService: II18nService) {
        this.httpAdapter = adapterHost.httpAdapter;
        this.i18nService = i18nService;
    }

    catch(exception: ValidationException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const command: object = exception.parameters[0] as object;
        const errors: object = exception.parameters[1] as object;
        const fields: Array<Field> = new Array<Field>();
        Object.keys(errors).forEach((error) => {
            const key = `messages.${errors[error] as string}`;
            const message: string = this.i18nService.translate(key);
            const value: string = command[error] as string;
            const field: Field = new Field(error, message, value);
            fields.push(field);
        });
        const status: number = HttpStatus.BAD_REQUEST;
        const key = `messages.${exception.message}`;
        const message: string = this.i18nService.translate(key);
        const body: ResponseStatus = new ResponseStatus(status, message, fields);
        this.logger.warn(JSON.stringify(body));
        this.httpAdapter.reply(context.getResponse(), body, status);
    }
}
