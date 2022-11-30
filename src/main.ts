import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { GlobalExceptionFilter } from '@/web-api/commons/filters';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(
        new GlobalExceptionFilter(app.get(HttpAdapterHost)),
    );
    await app.listen(3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
