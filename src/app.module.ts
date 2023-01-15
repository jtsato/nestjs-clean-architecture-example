import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { RegisterUserModule } from '@/web-api/entrypoints/register-user';
import { HealthCheckModule } from './web-api/entrypoints/health-check';

@Module({
    imports: [RegisterUserModule, GetUserByNameModule, HealthCheckModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule { }
