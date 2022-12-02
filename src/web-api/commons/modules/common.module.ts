import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter, NotFoundExceptionFilter, UniqueConstraintExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';
import { ResponseTransformerInterceptor, StopwatchInterceptor } from '@/web-api/commons/interceptors';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: UniqueConstraintExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: NotFoundExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: ValidationExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: StopwatchInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: ResponseTransformerInterceptor,
        },
    ],
})

export class WebModule { }
