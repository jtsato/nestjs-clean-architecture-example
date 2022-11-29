import { Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameController } from '@/web-api/entrypoints/get-user-by-name';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { GetUserByNameProvider } from '@/infra/providers';
import { UserRepository } from '@/infra/repositories';
import { IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name/get-user-by-name-usecase.interface';
import { NotFoundExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';

@Module({
    imports: [],
    controllers: [GetUserByNameController],
    providers: [
        UserRepository,
        GetUserByNameUseCase,
        {
            provide: IGetUserByNameUseCase,
            useClass: GetUserByNameUseCase,
        },
        {
            provide: GetUserByNameGateway,
            useClass: GetUserByNameProvider,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: ValidationExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: NotFoundExceptionFilter,
        },
    ],
    exports: [GetUserByNameUseCase],
})

export class GetUserByNameModule {
}
