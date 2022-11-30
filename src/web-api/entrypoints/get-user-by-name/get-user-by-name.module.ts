import { Module } from '@nestjs/common';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameController } from '@/web-api/entrypoints/get-user-by-name';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { GetUserByNameProvider } from '@/infra/providers';
import { UserRepository } from '@/infra/repositories';
import { IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name/get-user-by-name-usecase.interface';
import { WebModule } from '@/web-api/commons/modules/web-module';

@Module({
    imports: [WebModule],
    controllers: [GetUserByNameController],
    providers: [
        UserRepository,
        GetUserByNameProvider,
        {
            provide: IGetUserByNameUseCase,
            useClass: GetUserByNameUseCase,
        },
        {
            provide: GetUserByNameGateway,
            useClass: GetUserByNameProvider,
        },
    ],
    exports: [GetUserByNameGateway, GetUserByNameProvider],
})

export class GetUserByNameModule {
}
