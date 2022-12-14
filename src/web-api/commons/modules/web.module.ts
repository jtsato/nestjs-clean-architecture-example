import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { GlobalExceptionFilter, NotFoundExceptionFilter, UniqueConstraintExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';
import { ResponseTransformerInterceptor, StopwatchInterceptor } from '@/web-api/commons/interceptors';

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            fallbacks: {
                'en-*': 'en',
                'pt-*': 'pt',
            },
            loaderOptions: {
                path: path.join(__dirname, '/../../i18n/'),
                watch: true,
            },
            resolvers: [
                { use: AcceptLanguageResolver, options: ['en', 'pt'] },
            ],
        }),
    ],
    exports: [],
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
