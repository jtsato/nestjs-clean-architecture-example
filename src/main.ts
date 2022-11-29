import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/web-api/commons/filters';
import { StopwatchInterceptor } from '@/web-api/commons/interceptors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(
        new GlobalExceptionFilter(app.get(HttpAdapterHost)),
    );
    app.useGlobalInterceptors(new StopwatchInterceptor());
    await app.listen(3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
