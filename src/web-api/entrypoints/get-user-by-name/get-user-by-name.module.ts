import { Module } from '@nestjs/common';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { GetUserByNameController } from '@/web-api/entrypoints/get-user-by-name';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { GetUserByNameProvider } from '@/infra/providers';
import { UserRepository } from '@/infra/repositories';
import { IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name/get-user-by-name-usecase.interface';

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
        }],
    exports: [GetUserByNameUseCase],
})

export class GetUserByNameModule {
}
