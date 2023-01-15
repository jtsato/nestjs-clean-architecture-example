import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const SERVE_LISTENER_PORT = configService.get<number>('SERVE_LISTENER_PORT');
    const ENDPOINT_PREFIX = configService.get<string>('ENDPOINT_PREFIX');
    const SWAGGER_SETUP_PATH = configService.get<string>('SWAGGER_SETUP_PATH');
    const TITLE = configService.get<string>('TITLE');
    const DESCRIPTION = configService.get<string>('DESCRIPTION');
    const INFO_NAME = configService.get<string>('INFO_NAME');
    const INFO_URL = configService.get<string>('INFO_URL');
    const INFO_EMAIL = configService.get<string>('INFO_EMAIL');
    const VERSION = configService.get<string>('VERSION');
    const SERVER_URL = configService.get<string>('SERVER_URL');
    const API_KEY_NAME = configService.get<string>('API_KEY_NAME');
    const EXTERNAL_DOC = configService.get<string>('EXTERNAL_DOC');

    app.setGlobalPrefix(ENDPOINT_PREFIX);

    const config = new DocumentBuilder()
        .setTitle(TITLE)
        .setExternalDoc(EXTERNAL_DOC, EXTERNAL_DOC)
        .setContact(INFO_NAME, INFO_URL, INFO_EMAIL)
        .setDescription(DESCRIPTION)
        .setVersion(VERSION)
        .addServer(SERVER_URL)
        .addApiKey({ type: 'apiKey', name: API_KEY_NAME, in: 'header' }, 'Api-Key')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SWAGGER_SETUP_PATH, app, document);

    await app.listen(SERVE_LISTENER_PORT || 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
