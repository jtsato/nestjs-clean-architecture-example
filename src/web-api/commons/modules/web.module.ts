import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { GlobalExceptionFilter, NotFoundExceptionFilter, UniqueConstraintExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';
import { ResponseTransformerInterceptor, StopwatchInterceptor } from '@/web-api/commons/interceptors';

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/../../i18n/'),
                watch: true,
            },
            resolvers: [
                AcceptLanguageResolver,
            ],
        }),
    ],
    exports: [
        I18nModule,
    ],
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
