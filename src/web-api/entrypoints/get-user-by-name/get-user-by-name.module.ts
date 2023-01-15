import { Module } from '@nestjs/common';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameController, GetUserByNameDecoratorController, IGetUserByNameControllerSymbol } from '@/web-api/entrypoints/get-user-by-name';
import { IGetUserByNameGatewaySymbol } from '@/core/usecases/xcutting';
import { GetUserByNameProvider } from '@/infra/providers';
import { UserRepository } from '@/infra/repositories';
import { IGetUserByNameUseCaseSymbol } from '@/core/usecases/get-user-by-name/get-user-by-name-usecase.interface';
import { WebModule } from '@/web-api/commons/modules';

@Module({
    imports: [WebModule],
    controllers: [GetUserByNameDecoratorController],
    providers: [
        UserRepository,
        GetUserByNameProvider,
        {
            provide: IGetUserByNameControllerSymbol,
            useClass: GetUserByNameController,
        },
        {
            provide: IGetUserByNameUseCaseSymbol,
            useClass: GetUserByNameUseCase,
        },
        {
            provide: IGetUserByNameGatewaySymbol,
            useClass: GetUserByNameProvider,
        },
    ],
    exports: [IGetUserByNameGatewaySymbol, GetUserByNameProvider],
})

export class GetUserByNameModule { }
