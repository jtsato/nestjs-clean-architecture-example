import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ResponseTransformerInterceptor } from '@/web-api/commons/interceptors';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { RegisterUserModule } from '@/web-api/entrypoints/register-user';

@Module({
    imports: [RegisterUserModule, GetUserByNameModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformerInterceptor,
        },
    ],
})
export class AppModule { }
