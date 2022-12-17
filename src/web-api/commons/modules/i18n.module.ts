import { Module, Scope } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule as ExternalI18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { II18nServiceSymbol } from '@/core/commons';
import { I18nService } from '@/web-api/commons/services';

@Module({
    imports: [
        ExternalI18nModule.forRoot({
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
                AcceptLanguageResolver,
            ],
        }),
    ],
    exports: [II18nServiceSymbol],
    controllers: [],
    providers: [
        {
            provide: II18nServiceSymbol,
            scope: Scope.DEFAULT,
            useClass: I18nService,
        },
    ],
})

export class I18nModule { }
